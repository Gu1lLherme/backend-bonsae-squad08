import {Controller,Get,Param,Res,HttpStatus,} from '@nestjs/common';
import { LoteImportacaoService } from './lote-importacao.service';

@Controller('lotes')
export class LoteImportacaoController {
  constructor(private readonly loteService: LoteImportacaoService) {}

  @Get(':loteId')
  async obterLote(@Param('loteId') loteId: string, @Res() res) {
    const lote = await this.loteService.buscarPorLoteId(loteId);
    if (!lote) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Lote não encontrado' });
    }
    return res.status(HttpStatus.OK).json(lote);
  }
}