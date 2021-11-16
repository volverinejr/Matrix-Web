import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalheComponent } from './detalhe/detalhe.component';
import { EditarComponent } from './editar/editar.component';
import { ListarComponent } from './listar/listar.component';
import { NovoComponent } from './novo/novo.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppCommonModule } from 'src/app/app.common.module';
import { SistemaRoutingModule } from './sistema-routing.module';



@NgModule({
  declarations: [
    DetalheComponent,
    EditarComponent,
    ListarComponent,
    NovoComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    AppCommonModule,
    SistemaRoutingModule,
  ],
  exports: [ListarComponent, NovoComponent, DetalheComponent, EditarComponent],
})
export class SistemaModule { }
