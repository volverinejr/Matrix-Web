import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrormensageService } from 'src/app/core/server/errormensage.service';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html',
  styleUrls: ['./novo.component.css']
})
export class NovoComponent implements OnInit {
  form!: FormGroup;
  carregando: boolean = false;

  constructor(
    private service: UsuarioService,
    private router: Router,
    private errorMensagem: ErrormensageService,
  ) { }

  ngOnInit(): void {
    this.iniciarForm();
  }

  iniciarForm() {
    this.form = new FormGroup({
      username: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(20)])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(20)])),
      enabled: new FormControl(true),
      nome: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(100)])),
      apelido: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(20)])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    });
  }

  //------Mensagem Validação
  getErrorUsername() {
    if (this.form.controls.username.hasError('required')) {
      return 'Campo Requerido';
    } else if (this.form.controls.username.hasError('minlength')) {
      return 'Mín. de 4 caracteres';
    } else if (this.form.controls.username.hasError('maxlength')) {
      return 'Máx. de 20 caracteres';
    }
    return '';
  }
  getErrorPassword() {
    if (this.form.controls.password.hasError('required')) {
      return 'Campo Requerido';
    } else if (this.form.controls.password.hasError('minlength')) {
      return 'Mín. de 4 caracteres';
    } else if (this.form.controls.password.hasError('maxlength')) {
      return 'Máx. de 20 caracteres';
    }
    return '';
  }
  getErrorNome() {
    if (this.form.controls.nome.hasError('required')) {
      return 'Campo Requerido';
    } else if (this.form.controls.nome.hasError('minlength')) {
      return 'Mín. de 4 caracteres';
    } else if (this.form.controls.nome.hasError('maxlength')) {
      return 'Máx. de 100 caracteres';
    }
    return '';
  }
  getErrorApelido() {
    if (this.form.controls.apelido.hasError('required')) {
      return 'Campo Requerido';
    } else if (this.form.controls.apelido.hasError('minlength')) {
      return 'Mín. de 4 caracteres';
    } else if (this.form.controls.apelido.hasError('maxlength')) {
      return 'Máx. de 20 caracteres';
    }
    return '';
  }
  getErrorEmail() {
    if (this.form.controls.email.hasError('required')) {
      return 'Campo Requerido';
    } else if (this.form.controls.email.hasError('email')) {
      return 'Email inválido';
    }
    return '';
  }
  //------Mensagem Validação

  salvar() {
    if (this.form.invalid) {
      return;
    }

    this.carregando = true;
    this.service.new(this.form.value).subscribe(
      () => {
        this.carregando = false;
        this.router.navigate(['/user']);
      },
      (error: any) => {
        this.carregando = false;
        this.errorMensagem.mostrarError('', error);
      }
    );

  }

  voltar() {
    window.history.back()
  }


}
