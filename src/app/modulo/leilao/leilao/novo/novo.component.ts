import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrormensageService } from 'src/app/core/server/errormensage.service';
import { LeilaoService } from '../leilao.service';
import localePt from '@angular/common/locales/pt';
import { DatePipe, registerLocaleData } from '@angular/common';

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
  registro: any = {};

  constructor(
    private service: LeilaoService,
    private router: Router,
    private errorMensagem: ErrormensageService,
    public datepipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.iniciarForm();
  }

  iniciarForm() {
    this.form = new FormGroup({
      numero: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(10)])),
      aberto: new FormControl(true),
      dataAberturaFormatada: new FormControl('', Validators.compose([Validators.required])),
    });
  }

  //------Mensagem Validação
  getErrorNumero() {
    if (this.form.controls.numero.hasError('required')) {
      return 'Campo Requerido';
    } else if (this.form.controls.numero.hasError('minlength')) {
      return 'Mín. de 6 caracteres';
    } else if (this.form.controls.numero.hasError('maxlength')) {
      return 'Máx. de 10 caracteres';
    }
    return '';
  }
  //------Mensagem Validação

  salvar() {
    if (this.form.invalid) {
      return;
    }

    this.registro = this.form.value;

    if (this.form.controls.dataAberturaFormatada.dirty) {
      let prazoTemp: Date = this.form.controls.dataAberturaFormatada.value;
      let aberturaFormatado: string = this.datepipe.transform(prazoTemp, 'yyyy-MM-dd')!;

      this.registro.dataAbertura = aberturaFormatado + 'T03:00:00.000+00:00';
    } else {
      let separandoData = this.form.controls.dataAberturaFormatada.value.split('/');

      this.registro.dataAbertura = separandoData[2] + '-' + separandoData[1] + '-' + separandoData[0] + 'T03:00:00.000+00:00';
    }

    this.carregando = true;
    this.service.new(this.registro).subscribe(
      () => {
        this.carregando = false;
        this.router.navigate(['/leilao']);
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
