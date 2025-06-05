import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { Usuario, UsuarioSchema } from './schemas/usuario.schema';
import { ProcessoImportacaoModule } from 'src/processo-importacao/processo-importacao.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Usuario.name, schema: UsuarioSchema }]),
    forwardRef(() => ProcessoImportacaoModule), // Importa o módulo de processo de importação se necessário
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuarioModule {}