import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetalheComponent } from './detalhe/detalhe.component';
import { EditarComponent } from './editar/editar.component';
import { LeilaoGuard } from './guard/leilao.guard';
import { ListarComponent } from './listar/listar.component';
import { NotaFiscalDetalheComponent } from './nota-fiscal-detalhe/nota-fiscal-detalhe.component';
import { NotaFiscalEditarComponent } from './nota-fiscal-editar/nota-fiscal-editar.component';
import { NotaFiscalItemDetalheComponent } from './nota-fiscal-item-detalhe/nota-fiscal-item-detalhe.component';
import { NotaFiscalItemListarComponent } from './nota-fiscal-item-listar/nota-fiscal-item-listar.component';
import { NotaFiscalItemNovoComponent } from './nota-fiscal-item-novo/nota-fiscal-item-novo.component';
import { NotaFiscalListarComponent } from './nota-fiscal-listar/nota-fiscal-listar.component';
import { NotaFiscalNovoComponent } from './nota-fiscal-novo/nota-fiscal-novo.component';
import { NovoComponent } from './novo/novo.component';
import { VeiculoDetalheComponent } from './veiculo-detalhe/veiculo-detalhe.component';
import { VeiculoListarComponent } from './veiculo-listar/veiculo-listar.component';
import { VeiculoNovoComponent } from './veiculo-novo/veiculo-novo.component';


const Routes: Routes = [
  { path: '', component: ListarComponent },
  {
    path: 'novo', component: NovoComponent,
    canLoad: [LeilaoGuard],
    canActivate: [LeilaoGuard],
  },
  {
    path: 'detalhe/:id', component: DetalheComponent,
    canLoad: [LeilaoGuard],
    canActivate: [LeilaoGuard],
  },
  {
    path: 'editar/:id', component: EditarComponent,
    canLoad: [LeilaoGuard],
    canActivate: [LeilaoGuard],
  },

  //Veiculo
  {
    path: ':id/veiculo', component: VeiculoListarComponent,
    canLoad: [LeilaoGuard],
    canActivate: [LeilaoGuard],
  },
  {
    path: ':id/veiculo-novo', component: VeiculoNovoComponent,
    canLoad: [LeilaoGuard],
    canActivate: [LeilaoGuard],
  },
  {
    path: ':id/veiculo-detalhe/:idVeiculo', component: VeiculoDetalheComponent,
    canLoad: [LeilaoGuard],
    canActivate: [LeilaoGuard],
  },

  //Nota Fiscal
  {
    path: ':id/nota-fiscal', component: NotaFiscalListarComponent,
    canLoad: [LeilaoGuard],
    canActivate: [LeilaoGuard],
  },
  {
    path: ':id/nota-fiscal-novo', component: NotaFiscalNovoComponent,
    canLoad: [LeilaoGuard],
    canActivate: [LeilaoGuard],
  },
  {
    path: ':id/nota-fiscal-editar/:idNotaFiscal', component: NotaFiscalEditarComponent,
    canLoad: [LeilaoGuard],
    canActivate: [LeilaoGuard],
  },
  {
    path: ':id/nota-fiscal-detalhe/:idNotaFiscal', component: NotaFiscalDetalheComponent,
    canLoad: [LeilaoGuard],
    canActivate: [LeilaoGuard],
  },
  //Item
  {
    path: ':id/nota-fiscal/:idNota/item', component: NotaFiscalItemListarComponent,
    canLoad: [LeilaoGuard],
    canActivate: [LeilaoGuard],
  },
  {
    path: ':id/nota-fiscal/:idNota/item/detalhe/:idItem', component: NotaFiscalItemDetalheComponent,
    canLoad: [LeilaoGuard],
    canActivate: [LeilaoGuard],
  },
  {
    path: ':id/nota-fiscal/:idNota/item-novo', component: NotaFiscalItemNovoComponent,
    canLoad: [LeilaoGuard],
    canActivate: [LeilaoGuard],
  },



];

@NgModule({
  imports: [RouterModule.forChild(Routes)],
  exports: [RouterModule]
})
export class LeilaoRoutingModule { }
