import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetalheComponent } from './detalhe/detalhe.component';
import { EditarComponent } from './editar/editar.component';
import { SistemaGuard } from './guard/sistema.guard';
import { ListarComponent } from './listar/listar.component';
import { NovoComponent } from './novo/novo.component';


const Routes: Routes = [
  { path: '', component: ListarComponent },
  {
    path: 'novo', component: NovoComponent,
    canLoad: [SistemaGuard],
    canActivate: [SistemaGuard],
  },
  {
    path: 'detalhe/:id', component: DetalheComponent,
    canLoad: [SistemaGuard],
    canActivate: [SistemaGuard],
  },
  {
    path: 'editar/:id', component: EditarComponent,
    canLoad: [SistemaGuard],
    canActivate: [SistemaGuard],

  },
];

@NgModule({
  imports: [RouterModule.forChild(Routes)],
  exports: [RouterModule]
})
export class SistemaRoutingModule { }
