import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalheComponent } from './detalhe/detalhe.component';
import { EditarComponent } from './editar/editar.component';
import { ListarComponent } from './listar/listar.component';
import { NovoComponent } from './novo/novo.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppCommonModule } from 'src/app/app.common.module';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { PermissaoListarComponent } from './permissao-listar/permissao-listar.component';
import { PaginaListarComponent } from './pagina-listar/pagina-listar.component';



@NgModule({
  declarations: [
    DetalheComponent,
    EditarComponent,
    ListarComponent,
    PermissaoListarComponent,
    PaginaListarComponent,
    NovoComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    AppCommonModule,
    UsuarioRoutingModule,
  ],
  exports: [ListarComponent, NovoComponent, DetalheComponent, EditarComponent, PermissaoListarComponent, PaginaListarComponent],
})
export class UsuarioModule { }
