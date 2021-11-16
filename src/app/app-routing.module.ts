import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuGuard } from './modulo/admin/menu/guard/menu.guard';
import { PaginaGuard } from './modulo/admin/pagina/guard/pagina.guard';
import { RoleGuard } from './modulo/admin/role/guard/role.guard';
import { SistemaGuard } from './modulo/admin/sistema/guard/sistema.guard';
import { UsuarioGuard } from './modulo/admin/usuario/guard/usuario.guard';
import { DetranGuard } from './modulo/leilao/detran/guard/detran.guard';
import { LeilaoGuard } from './modulo/leilao/leilao/guard/leilao.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./modulo/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'permissao',
    loadChildren: () => import('./modulo/admin/role/role.module').then(m => m.RoleModule),
    canLoad: [RoleGuard],
    canActivate: [RoleGuard],
  },
  {
    path: 'user',
    loadChildren: () => import('./modulo/admin/usuario/usuario.module').then(m => m.UsuarioModule),
    canLoad: [UsuarioGuard],
    canActivate: [UsuarioGuard],
  },
  {
    path: 'sistema',
    loadChildren: () => import('./modulo/admin/sistema/sistema.module').then(m => m.SistemaModule),
    canLoad: [SistemaGuard],
    canActivate: [SistemaGuard],
  },
  {
    path: 'menu',
    loadChildren: () => import('./modulo/admin/menu/menu.module').then(m => m.MenuModule),
    canLoad: [MenuGuard],
    canActivate: [MenuGuard],
  },
  {
    path: 'pagina',
    loadChildren: () => import('./modulo/admin/pagina/pagina.module').then(m => m.PaginaModule),
    canLoad: [PaginaGuard],
    canActivate: [PaginaGuard],
  },

  {
    path: 'leilao',
    loadChildren: () => import('./modulo/leilao/leilao/leilao.module').then(m => m.LeilaoModule),
    canLoad: [LeilaoGuard],
    canActivate: [LeilaoGuard],
  },
  {
    path: 'remessa',
    loadChildren: () => import('./modulo/leilao/remessa/remessa.module').then(m => m.RemessaModule),
    canLoad: [LeilaoGuard],
    canActivate: [LeilaoGuard],
  },
  {
    path: 'detran',
    loadChildren: () => import('./modulo/leilao/detran/detran.module').then(m => m.DetranModule),
    canLoad: [DetranGuard],
    canActivate: [DetranGuard],
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
