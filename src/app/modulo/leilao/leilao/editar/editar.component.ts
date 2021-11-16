import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LeilaoService } from '../leilao.service';
import localePt from '@angular/common/locales/pt';
import { DatePipe, registerLocaleData } from '@angular/common';
import { ErrormensageService } from 'src/app/core/server/errormensage.service';

registerLocaleData(localePt, 'pt');

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
  providers: [DatePipe]
})
export class EditarComponent implements OnInit {
  id!: number;
  inscricao!: Subscription;
  dataLeilao: any;
  form!: FormGroup;
  carregando: boolean = false;
  pt: any;
  registro: any = {};


  constructor(
    private route: ActivatedRoute,
    private service: LeilaoService,
    private errorMensagem: ErrormensageService,
    private router: Router,
    public datepipe: DatePipe,
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
      numero: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(10)])),
      aberto: new FormControl(true),
      dataAbertura: new FormControl('', Validators.compose([Validators.required])),
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

  atualizar() {
    if (this.form.invalid) {
      return;
    }


    this.registro = this.form.value;

    if (this.form.controls.dataAbertura.dirty) {
      let prazoTemp: Date = this.form.controls.dataAbertura.value;
      let aberturaFormatado: string = this.datepipe.transform(prazoTemp, 'yyyy-MM-dd')!;

      this.registro.dataAbertura = aberturaFormatado + 'T03:00:00.000+00:00';
    } else {
      let separandoData = this.form.controls.dataAbertura.value.split('/');

      this.registro.dataAbertura = separandoData[2] + '-' + separandoData[1] + '-' + separandoData[0] + 'T03:00:00.000+00:00';
    }


    this.carregando = true;
    this.service.update(this.id, this.registro).subscribe(
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
    this.router.navigate(['/leilao']);
  }

  ngOnDEstroy() {
    this.inscricao.unsubscribe();
  }
}
