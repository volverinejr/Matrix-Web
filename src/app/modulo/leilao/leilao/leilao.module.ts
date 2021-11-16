import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalheComponent } from './detalhe/detalhe.component';
import { EditarComponent } from './editar/editar.component';
import { ListarComponent } from './listar/listar.component';
import { NovoComponent } from './novo/novo.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppCommonModule } from 'src/app/app.common.module';
import { LeilaoRoutingModule } from './leilao-routing.module';
import { VeiculoListarComponent } from './veiculo-listar/veiculo-listar.component';
import { VeiculoDetalheComponent } from './veiculo-detalhe/veiculo-detalhe.component';
import { VeiculoNovoComponent } from './veiculo-novo/veiculo-novo.component';
import { NotaFiscalListarComponent } from './nota-fiscal-listar/nota-fiscal-listar.component';
import { NotaFiscalDetalheComponent } from './nota-fiscal-detalhe/nota-fiscal-detalhe.component';
import { NotaFiscalNovoComponent } from './nota-fiscal-novo/nota-fiscal-novo.component';
import { NotaFiscalEditarComponent } from './nota-fiscal-editar/nota-fiscal-editar.component';
import { NotaFiscalItemListarComponent } from './nota-fiscal-item-listar/nota-fiscal-item-listar.component';
import { NotaFiscalItemDetalheComponent } from './nota-fiscal-item-detalhe/nota-fiscal-item-detalhe.component';
import { NotaFiscalItemNovoComponent } from './nota-fiscal-item-novo/nota-fiscal-item-novo.component';


@NgModule({
  declarations: [
    ListarComponent,
    NovoComponent,
    EditarComponent,
    DetalheComponent,

    VeiculoListarComponent,
    VeiculoNovoComponent,
    VeiculoDetalheComponent,

    NotaFiscalListarComponent,
    NotaFiscalDetalheComponent,
    NotaFiscalNovoComponent,
    NotaFiscalEditarComponent,

    NotaFiscalItemListarComponent,
    NotaFiscalItemDetalheComponent,
    NotaFiscalItemNovoComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    AppCommonModule,
    LeilaoRoutingModule,
  ],
  exports: [
    ListarComponent, NovoComponent, EditarComponent, DetalheComponent,
    VeiculoListarComponent, VeiculoNovoComponent, VeiculoDetalheComponent,
    NotaFiscalListarComponent, NotaFiscalDetalheComponent, NotaFiscalNovoComponent, NotaFiscalEditarComponent,
    NotaFiscalItemListarComponent, NotaFiscalItemDetalheComponent, NotaFiscalItemNovoComponent,
  ],
})
export class LeilaoModule { }
