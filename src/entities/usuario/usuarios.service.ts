import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel, InjectConnection} from '@nestjs/mongoose';
import { Model, Connection, isValidObjectId } from 'mongoose';
import { Usuario, UsuarioDocument } from './schemas/usuario.schema';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { CreatePeriodoLetivoBatchDto } from '../periodo-letivo/dto/create-periodo-letivo-batch.dto';
import {v4 as uuidv4} from "uuid";
import { CreateUsuarioBatchDto } from './dto/create-usuario-batch.dto';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { ProcessoImportacaoService } from 'src/processo-importacao/processo-importacao.service';
import { StatusImportacao, EtapaImportacao } from 'src/processo-importacao/schemas/processo-importacao.schema';


@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario.name) private usuarioModel: Model<UsuarioDocument>,
    private readonly processoImportacaoService: ProcessoImportacaoService,
  ) {}

  async create(dto: CreateUsuarioDto): Promise<Usuario> {

    const emailExistente = await this.usuarioModel.findOne({ email: dto.email });
    if (emailExistente) {
      throw new BadRequestException('Email do usuário já cadastrado.');
    }

    const novoUsuario = new this.usuarioModel(dto);
    return await novoUsuario.save();
}



async createBatch(dto: CreateUsuarioBatchDto): Promise<any> {
  const processId = dto.processId;


  if (!processId) {
          throw new BadRequestException('processId é obrigatório');
        }
        const processo = await this.processoImportacaoService.getProcessoById(processId);
        if (processo.status !== StatusImportacao.EM_ANDAMENTO) {
          throw new BadRequestException('Processo não está em andamento');
        }
      
        if (processo.etapaAtual !== EtapaImportacao.PERIODOS) {
          throw new BadRequestException('Processo não está na etapa de PERIODOS');
        }


  const usuariosComStatus = dto.usuarios.map((usuario) => {
    const instance = plainToInstance(CreateUsuarioDto, usuario);
    const errors = validateSync(instance);

    const validationErrors = errors.map((e) =>
      Object.values(e.constraints || {}).join (', '));

    return {
      ...usuario,
      processId: processId, // Associa ao processo de importação
      valid: validationErrors.length === 0,
      validationErrors,
    };
  });

  

  await this.usuarioModel.insertMany(usuariosComStatus)
  await this.processoImportacaoService.marcarEtapaConcluida(processId, 'usuarios');

  return {
    batchId: processId,
    usuarios: usuariosComStatus,
  };
}

async updateInvalidUsuarios(id: string, updateDto: UpdateUsuarioDto): Promise <any> {

  if (!isValidObjectId(id)) {
    throw new BadRequestException("ID invalido")
  }

  const instance = plainToInstance(UpdateUsuarioDto, updateDto);
  const errors = validateSync(instance);

  const validationErrors = errors.map((e) => 
  Object.values(e.constraints || {}).join(', '));

  const valid = validationErrors.length ===0;

  const usuario = await this.usuarioModel.findByIdAndUpdate(

    id,
    {
      $set: {
        ...updateDto,
        valid,
        validationErrors,}
      },
      { new: true}
    
  );

  if (!usuario) {
    throw new NotFoundException('Usuário não encontrado');
  }
  return {
    message: 'Usuario Atualizado com sucesso',
    date: usuario,
  }
}
    

  /*async bulkCreate(createUsuariosDto: CreateUsuarioDto[]): Promise<Usuario[]> {
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
    
  }*/

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


 

