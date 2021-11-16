import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrormensageService } from 'src/app/core/server/errormensage.service';
import { RemessaService } from '../remessa.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
})
export class EditarComponent implements OnInit {
  id!: number;
  inscricao!: Subscription;
  form!: FormGroup;
  carregando: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private service: RemessaService,
    private errorMensagem: ErrormensageService,
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
      id: new FormControl(''),
      ano: new FormControl('', Validators.compose([Validators.required, Validators.min(2021) ])),
      valor: new FormControl('', Validators.compose([Validators.required, Validators.min(1) ])),
      nomeArquivo: new FormControl('', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(30)])),
      nomeArquivoRetorno: new FormControl('', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(30)])),
    });
  }

  //------Mensagem Validação
  getErrorAno() {
    if (this.form.controls.ano.hasError('required')) {
      return 'Campo Requerido';
    } else if (this.form.controls.ano.hasError('min')) {
      return 'Mín. 2021';
    }
    return '';
  }
  getErrorValor() {
    if (this.form.controls.valor.hasError('required')) {
      return 'Campo Requerido';
    } else if (this.form.controls.valor.hasError('min')) {
      return 'Mín. 1';
    }
    return '';
  }
  getErrorNomeArquivo() {
    if (this.form.controls.nomeArquivo.hasError('required')) {
      return 'Campo Requerido';
    } else if (this.form.controls.nomeArquivo.hasError('minlength')) {
      return 'Mín. de 10 caracteres';
    } else if (this.form.controls.nomeArquivo.hasError('maxlength')) {
      return 'Máx. de 30 caracteres';
    }
    return '';
  }
  getErrorNomeArquivoRetorno() {
    if (this.form.controls.nomeArquivoRetorno.hasError('required')) {
      return 'Campo Requerido';
    } else if (this.form.controls.nomeArquivoRetorno.hasError('minlength')) {
      return 'Mín. de 10 caracteres';
    } else if (this.form.controls.nomeArquivoRetorno.hasError('maxlength')) {
      return 'Máx. de 30 caracteres';
    }
    return '';
  }  //------Mensagem Validação

  atualizar() {
    if (this.form.invalid) {
      return;
    }

    this.carregando = true;
    this.service.update(this.id, this.form.value).subscribe(
      () => {
        this.carregando = false;
        this.router.navigate(['/remessa']);
      },
      (error: any) => {
        this.carregando = false;
        this.errorMensagem.mostrarError('', error);
      }
    );

  }

  voltar() {
    this.router.navigate(['/remessa']);
  }

  ngOnDEstroy() {
    this.inscricao.unsubscribe();
  }
}
