import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalheComponent } from './detalhe/detalhe.component';
import { EditarComponent } from './editar/editar.component';
import { ListarComponent } from './listar/listar.component';
import { NovoComponent } from './novo/novo.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppCommonModule } from 'src/app/app.common.module';
import { RemessaRoutingModule } from './remessa-routing.module';


@NgModule({
  declarations: [
    ListarComponent,
    NovoComponent,
    EditarComponent,
    DetalheComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    AppCommonModule,
    RemessaRoutingModule,
  ],
  exports: [
    ListarComponent, NovoComponent, EditarComponent, DetalheComponent,
  ],
})
export class RemessaModule { }
