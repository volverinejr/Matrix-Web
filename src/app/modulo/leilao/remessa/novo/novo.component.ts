import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrormensageService } from 'src/app/core/server/errormensage.service';
import localePt from '@angular/common/locales/pt';
import { DatePipe, registerLocaleData } from '@angular/common';
import { RemessaService } from '../remessa.service';

registerLocaleData(localePt, 'pt');

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html',
  styleUrls: ['./novo.component.css'],
  providers: [DatePipe]
})
export class NovoComponent implements OnInit {
  form!: FormGroup;
  carregando: boolean = false;
  pt: any;

  constructor(
    private service: RemessaService,
    private router: Router,
    private errorMensagem: ErrormensageService,
    public datepipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.iniciarForm();
  }

  iniciarForm() {
    this.form = new FormGroup({
      ano: new FormControl((new Date()).getFullYear(), Validators.compose([Validators.required, Validators.min(2021) ])),
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


}
