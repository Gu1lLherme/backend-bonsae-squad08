import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { HttpCode } from '@nestjs/common';
import { CreateUsuarioBatchDto } from './dto/create-usuario-batch.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  @UsePipes(new ValidationPipe({  whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    const usuario = await this.usuariosService.create(createUsuarioDto);
    return {
      message: 'Usuário criado com sucesso!',
      data: usuario,
    };
    
  }

  @Post('Batch')
  async createBatch(@Body() dto: CreateUsuarioBatchDto) {
    return this.usuariosService.createBatch(dto);
  }

  @Patch(':id/revalidar')
  async revalidarUsuario(
    @Param('id') id: string, @Body() updateDto: UpdateUsuarioDto
  ){
    return this.usuariosService.updateInvalidUsuarios(id,updateDto);
  }

  @Post('bulk')
  @UsePipes(new ValidationPipe({  whitelist: true, forbidNonWhitelisted: true }))
  async bulkCreate(@Body() createUsuariosDto: CreateUsuarioDto[]) {
    const usuariosCriados = await this.usuariosService.bulkCreate(createUsuariosDto);
    return {
      message: 'Usuários criados com sucesso!',
      data: usuariosCriados,
    };

  }

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(id);
  }
}



