import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel, InjectConnection} from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Usuario, UsuarioDocument } from './schemas/usuario.schema';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario.name) private usuarioModel: Model<UsuarioDocument>,@InjectConnection() private readonly connection: Connection,
  ) {}

  async create(dto: CreateUsuarioDto) {
    const usuario = new this.usuarioModel(dto);
    const problemas: string[] = [];
    if (!usuario.perfil) problemas.push('Perfil é obrigatório.');
      if (!usuario.nome) problemas.push('Nome é obrigatório.');
      if (!usuario.email) problemas.push('Email é obrigatório.');
      if (!usuario.cpf) problemas.push('CPF é obrigatório.');
      if (!usuario.senha) problemas.push('Senha é obrigatória.');

    if (problemas.length > 0) {
      throw new BadRequestException({
        message: 'Erros de validação no usuário.',
        erros: problemas,
      });
    }
    const usuarioExistente = await this.usuarioModel.findOne
({ email: dto.email });
    if (usuarioExistente) {
      throw new BadRequestException('Email já cadastrado.');
    }
    const usuarioCpfExistente = await this.usuarioModel.findOne({ cpf: dto.cpf });
    if (usuarioCpfExistente) {
      throw new BadRequestException('CPF já cadastrado.');
    }
    const usuarioMatriculaExistente = await this.usuarioModel.findOne({ matriculaIES: dto.matriculaIes });
    if (usuarioMatriculaExistente) {
      throw new BadRequestException('Matrícula já cadastrada.');
    }
    const usuarioTelefoneExistente = await this.usuarioModel.findOne({ telefone: dto.telefone });
    if (usuarioTelefoneExistente) {
      throw new BadRequestException('Telefone já cadastrado.');
    }
    
    return usuario.save();
  }

  async bulkCreate(createUsuariosDto: CreateUsuarioDto[]): Promise<Usuario[]> {
    if (!Array.isArray(createUsuariosDto) || createUsuariosDto.length === 0) {
      throw new BadRequestException('Payload precisa ser uma lista de usuários.');
    }

    const erros: { index: number; error: string }[] = [];

    createUsuariosDto.forEach((usuario, index) => {
      const problemas: string[] = [];
      if (!usuario.perfil) problemas.push('Perfil é obrigatório.');
      if (!usuario.nome) problemas.push('Nome é obrigatório.');
      if (!usuario.email) problemas.push('Email é obrigatório.');
      if (!usuario.cpf) problemas.push('CPF é obrigatório.');
      if (!usuario.senha) problemas.push('Senha é obrigatória.');

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
      const usuariosCriados = await this.usuarioModel.insertMany(createUsuariosDto, { session });
      await session.commitTransaction();
      session.endSession();
      return usuariosCriados;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error('Erro no bulkCreate de Usuários:', error);
      throw new InternalServerErrorException('Erro ao criar usuários em lote.');
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
