import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetalheComponent } from './detalhe/detalhe.component';
import { EditarComponent } from './editar/editar.component';
import { MenuGuard } from './guard/menu.guard';
import { ListarComponent } from './listar/listar.component';
import { NovoComponent } from './novo/novo.component';


const Routes: Routes = [
  { path: '', component: ListarComponent },
  {
    path: 'novo', component: NovoComponent,
    canLoad: [MenuGuard],
    canActivate: [MenuGuard],
  },
  {
    path: 'detalhe/:id', component: DetalheComponent,
    canLoad: [MenuGuard],
    canActivate: [MenuGuard],
  },
  {
    path: 'editar/:id', component: EditarComponent,
    canLoad: [MenuGuard],
    canActivate: [MenuGuard],

  },
];

@NgModule({
  imports: [RouterModule.forChild(Routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
