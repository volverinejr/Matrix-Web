import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  id!: number;
  inscricao!: Subscription;
  dataSistema: any;
  form!: FormGroup;
  carregando: boolean = false;



  constructor(
    private route: ActivatedRoute,
    private service: UsuarioService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.iniciarForm();

    // Recebendo o parametro da rota
    this.inscricao =
      this.route.params.subscribe(
        (params: any) => {
          this.id = params['id'];

          this.service.findById(this.id).subscribe(
            (response: any) => {
              this.form.patchValue(response);
            },
            (error: any) => {
              console.log(error.error.message);
            }
          );
        }
      );


  }

  iniciarForm() {
    this.form = new FormGroup({
      enabled: new FormControl(true),
      nome: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(100)])),
      apelido: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(20)])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    });
  }

  //------Mensagem Validação
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

  atualizar() {
    if (this.form.invalid) {
      return;
    }

    this.carregando = true;
    this.service.update(this.id, this.form.value).subscribe(
      () => {
        this.carregando = false;
        this.router.navigate(['/user']);
      },
      (error: any) => {
        this.carregando = false;
        console.log(error.error.message);
      }
    );

  }

  voltar() {
    window.history.back()
  }



  ngOnDEstroy() {
    this.inscricao.unsubscribe();
  }
}
