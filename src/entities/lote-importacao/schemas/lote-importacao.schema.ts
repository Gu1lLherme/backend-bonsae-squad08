import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LoteImportacaoDocument = LoteImportacao & Document;


// Entidade LoteImportacao para controlar os lotes de importação de dados e manter a traqueabilidade de cada importação
// de dados, além de permitir a validação e o tratamento de erros durante o processo de importação.
@Schema({ timestamps: true })
export class LoteImportacao {
  @Prop({ required: true })
  loteId: string;

  @Prop({ required: true })
tipo: 'turmas' | 'periodo_letivo' | 'disciplina' | 'usuario';

  @Prop({ required: true })
  nomeArquivo: string;

  @Prop({
    required: true,
    enum: ['em_validacao', 'com_erro', 'importado'],
    default: 'em_validacao',
  })
  status: string;

  @Prop({
    type: [
      {
        index: { type: Number },
        mensagens: { type: [String] },
        item: { type: Object },
      },
    ],
  })
  erros?: Array<{
    index: number;
    mensagens: string[];
    item: any;
  }>;

  @Prop()
  quantidade_total?: number;

  @Prop()
  quantidade_sucesso?: number;

  @Prop({ default: Date.now })
  dataEnvio: Date;
}

export const LoteImportacaoSchema = SchemaFactory.createForClass(LoteImportacao);