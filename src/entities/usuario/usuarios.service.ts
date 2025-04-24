import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario, UsuarioDocument } from './schemas/usuario.schema';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario.name) private usuarioModel: Model<UsuarioDocument>,
  ) {}

  async create(dto: CreateUsuarioDto) {
    const usuario = new this.usuarioModel(dto);
    return usuario.save();
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
