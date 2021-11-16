import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrormensageService } from 'src/app/core/server/errormensage.service';
import { LeilaoService } from '../leilao.service';
import localePt from '@angular/common/locales/pt';
import { DatePipe, registerLocaleData } from '@angular/common';
import { LeilaoNotaFiscalService } from '../leilaonotafiscal.service';

registerLocaleData(localePt, 'pt');

@Component({
  selector: 'app-novo',
  templateUrl: './nota-fiscal-novo.component.html',
  styleUrls: ['./nota-fiscal-novo.component.css'],
  providers: [DatePipe]
})
export class NotaFiscalNovoComponent implements OnInit {
  form!: FormGroup;
  carregando: boolean = false;
  pt: any;
  registro: any = {};
  id: number = 0;

  public infoLeilao: string = "";

  constructor(
    private service: LeilaoService,
    private serviceNotaFiscal: LeilaoNotaFiscalService,
    private router: Router,
    private errorMensagem: ErrormensageService,
    public datepipe: DatePipe,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];

        this.carregarLeilao();

        this.iniciarForm();
      }
    );
  }

  iniciarForm() {
    this.form = new FormGroup({
      numero: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])),
      dataEmissao: new FormControl('', Validators.compose([Validators.required])),
    });
  }

  //------Mensagem Validação
  getErrorNumero() {
    if (this.form.controls.numero.hasError('required')) {
      return 'Campo Requerido';
    } else if (this.form.controls.numero.hasError('minlength')) {
      return 'Mín. de 3 caracteres';
    } else if (this.form.controls.numero.hasError('maxlength')) {
      return 'Máx. de 20 caracteres';
    }
    return '';
  }
  //------Mensagem Validação

  salvar() {
    if (this.form.invalid) {
      return;
    }

    this.registro = this.form.value;


    if (this.form.controls.dataEmissao.dirty) {
      let prazoTemp: Date = this.form.controls.dataEmissao.value;
      let emissaoFormatado: string = this.datepipe.transform(prazoTemp, 'yyyy-MM-dd')!;

      this.registro.dataEmissao = emissaoFormatado + 'T10:00:00.000+00:00';
    } else {
      let separandoData = this.form.controls.dataEmissao.value.split('/');

      this.registro.dataEmissao = separandoData[2] + '-' + separandoData[1] + '-' + separandoData[0] + 'T10:00:00.000+00:00';
    }

    //Setando o objeto leilão
    let leilao : any = {};
    leilao.id = this.id;
    this.registro.leilao = leilao;


    this.carregando = true;
    this.serviceNotaFiscal.new(this.registro).subscribe(
      () => {
        this.carregando = false;
        this.router.navigate(['/leilao/' + this.id + '/nota-fiscal']);
      },
      (error: any) => {
        this.carregando = false;
        this.errorMensagem.mostrarError('', error);
      }
    );

  }

  voltar() {
    this.router.navigate(['/leilao/' + this.id + '/nota-fiscal']);
  }


  protected carregarLeilao() {
    this.service.findById(this.id).subscribe(
      (response: any) => {
        this.infoLeilao = response.numero;
      },
      (error: any) => {
        this.errorMensagem.mostrarError('', error);
      }
    );
  }

}
