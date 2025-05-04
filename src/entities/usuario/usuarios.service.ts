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

  async create(dto: CreateUsuarioDto): Promise<Usuario> {

    const emailExistente = await this.usuarioModel.findOne({ email: dto.email });
    if (emailExistente) {
      throw new BadRequestException('Email do usuário já cadastrado.');
    }

    const novoUsuario = new this.usuarioModel(dto);
    return await novoUsuario.save();
}
    

  async bulkCreate(createUsuariosDto: CreateUsuarioDto[]): Promise<Usuario[]> {
    if (!Array.isArray(createUsuariosDto) || createUsuariosDto.length === 0) {
      throw new BadRequestException('Payload precisa ser uma lista de usuários.');
    }

    const erros: { index: number; error: string }[] = [];

    // Validar todos os usuários
    createUsuariosDto.filter((usuario, index) => {
      const problemas: string[] = [];

      if (!usuario.perfil) problemas.push('Perfil é obrigatório.');
      if (!usuario.nome) problemas.push('Nome é obrigatório.');
      if (!usuario.email) problemas.push('Email é obrigatório.');
      if (!usuario.cpf) problemas.push('CPF é obrigatório.');
      if (!usuario.senha) problemas.push('Senha é obrigatória.');
      if (!usuario.matriculaIes || usuario.matriculaIes.trim() === '') problemas.push('Matrícula (IES) é obrigatória.');

      if (problemas.length > 0) {
        erros.push({ index, error: problemas.join(' | ') });
        return false; // Ignorar este usuário na inserção
      }
      return true; // Incluir este usuário na inserção
    });
    
  

    if (erros.length > 0) {
      throw new BadRequestException({
        message: 'Erros de validação nos usuários.',
        erros,
      });
    }


      // Inserir usuários
      const usuariosCriados = await this.usuarioModel.insertMany(createUsuariosDto);
      return usuariosCriados.map(usuario => usuario.toObject() as Usuario);
    
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


 

