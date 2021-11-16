import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppCommonModule } from 'src/app/app.common.module';
import { LoginRoutingModule } from './login-routing.module';
import { ErrormensageService } from 'src/app/core/server/errormensage.service';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    AppCommonModule,
    LoginRoutingModule,
  ],
  exports: [LoginComponent],
  providers: [ErrormensageService],
})
export class LoginModule { }
