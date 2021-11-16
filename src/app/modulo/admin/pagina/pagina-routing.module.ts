import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetalheComponent } from './detalhe/detalhe.component';
import { EditarComponent } from './editar/editar.component';
import { PaginaGuard } from './guard/pagina.guard';
import { ListarComponent } from './listar/listar.component';
import { NovoComponent } from './novo/novo.component';


const Routes: Routes = [
  { path: '', component: ListarComponent },
  {
    path: 'novo', component: NovoComponent,
    canLoad: [PaginaGuard],
    canActivate: [PaginaGuard],
  },
  {
    path: 'detalhe/:id', component: DetalheComponent,
    canLoad: [PaginaGuard],
    canActivate: [PaginaGuard],
  },
  {
    path: 'editar/:id', component: EditarComponent,
    canLoad: [PaginaGuard],
    canActivate: [PaginaGuard],

  },
];

@NgModule({
  imports: [RouterModule.forChild(Routes)],
  exports: [RouterModule]
})
export class PaginaRoutingModule { }
