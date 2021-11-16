import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrormensageService } from 'src/app/core/server/errormensage.service';
import { LocalStorageService } from 'src/app/core/server/local-storage.service';
import { LoginService } from './login.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form!: FormGroup;
  public carregando: boolean = false;

  constructor(
    protected service: LoginService,
    protected localStorageService: LocalStorageService,
    protected router: Router,
    protected errorMensagem: ErrormensageService,

  ) { }

  ngOnInit(): void {
    this.iniciarForm();
  }

  iniciarForm() {
    if (!this.localStorageService.isTokenExpirado()) {
      this.router.navigate(['']);
    }

    this.form = new FormGroup({
      username: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(50)])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(50)])),
    });
  }

  //------Mensagem Validação
  getErrorUsername() {
    if (this.form.controls.username.hasError('required')) {
      return 'Campo Requerido';
    } else if (this.form.controls.username.hasError('minlength')) {
      return 'Mín. de 4 caracteres';
    } else if (this.form.controls.username.hasError('maxLength')) {
      return 'Máx. de 50 caracteres';
    }
    return '';
  }
  getErrorPassword() {
    if (this.form.controls.password.hasError('required')) {
      return 'Campo Requerido';
    } else if (this.form.controls.password.hasError('minlength')) {
      return 'Mín. de 6 caracteres';
    } else if (this.form.controls.password.hasError('maxLength')) {
      return 'Máx. de 50 caracteres';
    }
    return '';
  }
  //------Mensagem Validação

  login() {
    if (this.form.invalid) {
      return;
    }

    this.carregando = true;
    this.service.login(this.form.value).subscribe(
      (response: any) => {
        this.localStorageService.loginUsuario(response);

        this.carregando = false;
        this.router.navigate(['']);
      },
      (error: any) => {
        this.carregando = false;
        this.errorMensagem.mostrarError('login', error);
      }
    );

  }



}
