import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetalheComponent } from './detalhe/detalhe.component';
import { EditarComponent } from './editar/editar.component';
import { UsuarioGuard } from './guard/usuario.guard';
import { ListarComponent } from './listar/listar.component';
import { NovoComponent } from './novo/novo.component';
import { PaginaListarComponent } from './pagina-listar/pagina-listar.component';
import { PermissaoListarComponent } from './permissao-listar/permissao-listar.component';


const Routes: Routes = [
  { path: '', component: ListarComponent },
  {
    path: 'novo', component: NovoComponent,
    canLoad: [UsuarioGuard],
    canActivate: [UsuarioGuard],
  },
  {
    path: 'detalhe/:id', component: DetalheComponent,
    canLoad: [UsuarioGuard],
    canActivate: [UsuarioGuard],
  },
  {
    path: 'editar/:id', component: EditarComponent,
    canLoad: [UsuarioGuard],
    canActivate: [UsuarioGuard],

  },

  {
    path: ':id/permissao', component: PermissaoListarComponent,
    canLoad: [UsuarioGuard],
    canActivate: [UsuarioGuard],
  },
  {
    path: ':id/pagina', component: PaginaListarComponent,
    canLoad: [UsuarioGuard],
    canActivate: [UsuarioGuard],
  },

];

@NgModule({
  imports: [RouterModule.forChild(Routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
