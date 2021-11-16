import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetalheComponent } from './detalhe/detalhe.component';
import { EditarComponent } from './editar/editar.component';
import { RemessaGuard } from './guard/remessa.guard';
import { ListarComponent } from './listar/listar.component';
import { NovoComponent } from './novo/novo.component';


const Routes: Routes = [
  { path: '', component: ListarComponent },
  {
    path: 'novo', component: NovoComponent,
    canLoad: [RemessaGuard],
    canActivate: [RemessaGuard],
  },
  {
    path: 'detalhe/:id', component: DetalheComponent,
    canLoad: [RemessaGuard],
    canActivate: [RemessaGuard],
  },
  {
    path: 'editar/:id', component: EditarComponent,
    canLoad: [RemessaGuard],
    canActivate: [RemessaGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(Routes)],
  exports: [RouterModule]
})
export class RemessaRoutingModule { }
