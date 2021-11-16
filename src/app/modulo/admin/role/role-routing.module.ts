import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetalheComponent } from './detalhe/detalhe.component';
import { EditarComponent } from './editar/editar.component';
import { RoleGuard } from './guard/role.guard';
import { ListarComponent } from './listar/listar.component';
import { NovoComponent } from './novo/novo.component';


const Routes: Routes = [
  { path: '', component: ListarComponent },
  {
    path: 'novo', component: NovoComponent,
    canLoad: [RoleGuard],
    canActivate: [RoleGuard],
  },
  {
    path: 'detalhe/:id', component: DetalheComponent,
    canLoad: [RoleGuard],
    canActivate: [RoleGuard],
  },
  {
    path: 'editar/:id', component: EditarComponent,
    canLoad: [RoleGuard],
    canActivate: [RoleGuard],

  },
];

@NgModule({
  imports: [RouterModule.forChild(Routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
