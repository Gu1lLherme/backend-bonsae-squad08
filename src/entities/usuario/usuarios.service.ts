import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel, InjectConnection} from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Usuario, UsuarioDocument } from './schemas/usuario.schema';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';


@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario.name) private usuarioModel: Model<UsuarioDocument>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async create(dto: CreateUsuarioDto) {
    const problemas: string[] = [];

    // Validações obrigatórias
    if (!dto.perfil) problemas.push('Perfil é obrigatório.');
    if (!dto.nome) problemas.push('Nome é obrigatório.');
    if (!dto.email) problemas.push('Email é obrigatório.');
    if (!dto.cpf) problemas.push('CPF é obrigatório.');
    if (!dto.senha) problemas.push('Senha é obrigatória.');
    if (!dto.matriculaIes) problemas.push('Matrícula (IES) é obrigatória.');

    if (problemas.length > 0) {
      throw new BadRequestException({
        message: 'Erros de validação no usuário.',
        erros: problemas,
      });
    }

    // Verificações de unicidade
    const [usuarioExistente, cpfExistente, matriculaExistente, telefoneExistente] = await Promise.all([
      this.usuarioModel.findOne({ email: dto.email }),
      this.usuarioModel.findOne({ cpf: dto.cpf }),
      this.usuarioModel.findOne({ matriculaIes: dto.matriculaIes }),
      dto.telefone ? this.usuarioModel.findOne({ telefone: dto.telefone }) : null,
    ]);

    if (usuarioExistente) {
      throw new BadRequestException('Email já cadastrado.');
    }
    if (cpfExistente) {
      throw new BadRequestException('CPF já cadastrado.');
    }
    if (matriculaExistente) {
      throw new BadRequestException('Matrícula (IES) já cadastrada.');
    }
    if (telefoneExistente) {
      throw new BadRequestException('Telefone já cadastrado.');
    }

    const usuario = new this.usuarioModel(dto);
    return usuario.save();
  }

  async bulkCreate(createUsuariosDto: CreateUsuarioDto[]): Promise<Usuario[]> {
    if (!Array.isArray(createUsuariosDto) || createUsuariosDto.length === 0) {
      throw new BadRequestException('Payload precisa ser uma lista de usuários.');
    }

    const erros: { index: number; error: string }[] = [];

    // Validar todos os usuários
    createUsuariosDto.forEach((usuario, index) => {
      const problemas: string[] = [];

      if (!usuario.perfil) problemas.push('Perfil é obrigatório.');
      if (!usuario.nome) problemas.push('Nome é obrigatório.');
      if (!usuario.email) problemas.push('Email é obrigatório.');
      if (!usuario.cpf) problemas.push('CPF é obrigatório.');
      if (!usuario.senha) problemas.push('Senha é obrigatória.');
      if (!usuario.matriculaIes || usuario.matriculaIes.trim() === '') problemas.push('Matrícula (IES) é obrigatória.');

      if (problemas.length > 0) {
        erros.push({ index, error: problemas.join(' | ') });
      }
    });

    if (erros.length > 0) {
      throw new BadRequestException({
        message: 'Erros de validação nos usuários.',
        erros,
      });
    }

    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      // Antes de inserir, validar se já existem registros conflitantes
      const emails = createUsuariosDto.map(u => u.email);
      const cpfs = createUsuariosDto.map(u => u.cpf);
      const matriculas = createUsuariosDto.map(u => u.matriculaIes);
      const telefones = createUsuariosDto.map(u => u.telefone).filter(Boolean); // Telefones podem ser nulos

      const existentes = await this.usuarioModel.find({
        $or: [
          { email: { $in: emails } },
          { cpf: { $in: cpfs } },
          { matriculaIes: { $in: matriculas } },
          { telefone: { $in: telefones } },
        ],
      }).session(session);

      if (existentes.length > 0) {
        const conflitos = existentes.map(e => ({
          email: e.email,
          cpf: e.cpf,
          matriculaIes: e.matriculaIes,
          telefone: e.telefone,
        }));
        throw new BadRequestException({
          message: 'Existem conflitos com usuários já cadastrados.',
          conflitos,
        });
      }

      // Inserir usuários
      const usuariosCriados = await this.usuarioModel.insertMany(createUsuariosDto, { session });
      await session.commitTransaction();
      return usuariosCriados;
    } catch (error) {
      await session.abortTransaction();
      console.error('Erro no bulkCreate de Usuários:', error);
      throw new InternalServerErrorException('Erro ao criar usuários em lote.');
    } finally {
      session.endSession();
    }
  }

  async findAll() {
    return this.usuarioModel.find().exec();
  }

  async findOne(id: string) {
    const usuario = await this.usuarioModel.findById(id);
    if (!usuario) throw new NotFoundException('Usuário não encontrado');
    return usuario;
  }

  async update(id: string, dto: UpdateUsuarioDto) {
    const usuario = await this.usuarioModel.findByIdAndUpdate(id, dto, { new: true });
    if (!usuario) throw new NotFoundException('Usuário não encontrado');
    return usuario;
  }

  async remove(id: string) {
    const usuario = await this.usuarioModel.findByIdAndDelete(id);
    if (!usuario) throw new NotFoundException('Usuário não encontrado');
    return usuario;
  }
}


 

