import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarComponent } from './listar/listar.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppCommonModule } from 'src/app/app.common.module';
import { DetranRoutingModule } from './detran-routing.module';


@NgModule({
  declarations: [
    ListarComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    AppCommonModule,
    DetranRoutingModule,
  ],
  exports: [
    ListarComponent,
  ],
})
export class DetranModule { }
