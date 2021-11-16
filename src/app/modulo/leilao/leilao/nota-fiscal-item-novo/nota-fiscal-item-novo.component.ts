import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrormensageService } from 'src/app/core/server/errormensage.service';
import { LeilaoService } from '../leilao.service';
import localePt from '@angular/common/locales/pt';
import { DatePipe, registerLocaleData } from '@angular/common';
import { LeilaoNotaFiscalService } from '../leilaonotafiscal.service';
import { LeilaoNotaFiscalItemService } from '../leilaonotafiscalitem.service';

registerLocaleData(localePt, 'pt');

@Component({
  selector: 'app-novo',
  templateUrl: './nota-fiscal-item-novo.component.html',
  styleUrls: ['./nota-fiscal-item-novo.component.css'],
  providers: [DatePipe]
})
export class NotaFiscalItemNovoComponent implements OnInit {
  form!: FormGroup;
  carregando: boolean = false;
  pt: any;
  registro: any = {};
  id: number = 0;
  idNota: number = 0;

  public infoLeilao: string = "";
  public infoNota: string = "";
  public infoLeilaoAberto: boolean = false;

  constructor(
    private service: LeilaoService,
    private serviceNotaFiscalItem: LeilaoNotaFiscalItemService,
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
        this.idNota = params['idNota'];

        this.carregarDadosDaNota();

        this.iniciarForm();
      }
    );
  }

  iniciarForm() {
    this.form = new FormGroup({
      valorInicial: new FormControl('', Validators.compose([Validators.required, Validators.min(0)])),
      valorArrematado: new FormControl('', Validators.compose([Validators.required, Validators.min(0)])),
      placaOuChassi: new FormControl('', Validators.compose([Validators.required])),
      cpfOuCnpj: new FormControl('', Validators.compose([Validators.required])),
    });
  }

  //------Mensagem Validação
  getErrorValorInicial() {
    if (this.form.controls.valorInicial.hasError('required')) {
      return 'Campo Requerido';
    } else if (this.form.controls.valorInicial.hasError('min')) {
      return 'Valor Mín. R$ 0,00';
    }
    return '';
  }
  getErrorValorArrematado() {
    if (this.form.controls.valorArrematado.hasError('required')) {
      return 'Campo Requerido';
    } else if (this.form.controls.valorArrematado.hasError('min')) {
      return 'Valor Mín. R$ 0,00';
    }
    return '';
  }
  getErrorPlacaOuChassi() {
    if (this.form.controls.placaOuChassi.hasError('required')) {
      return 'Campo Requerido';
    }
    return '';
  }
  getErrorCpfOuCnpj() {
    if (this.form.controls.cpfOuCnpj.hasError('required')) {
      return 'Campo Requerido';
    }
    return '';
  }
  //------Mensagem Validação

  salvar() {
    if (this.form.invalid) {
      return;
    }

    this.registro = this.form.value;


    //Setando o objeto notaFiscal
    let notaFiscal: any = {};
    notaFiscal.id = this.idNota;
    this.registro.notaFiscal = notaFiscal;


    this.carregando = true;
    this.serviceNotaFiscalItem.new(this.registro).subscribe(
      () => {
        this.carregando = false;
        this.router.navigate(['/leilao/' + this.id + '/nota-fiscal/' + this.idNota + '/item']);
      },
      (error: any) => {
        this.carregando = false;
        this.errorMensagem.mostrarError('', error);
      }
    );
  }

  voltar() {
    this.router.navigate(['/leilao/' + this.id + '/nota-fiscal/' + this.idNota + '/item']);
  }


  protected carregarDadosDaNota() {
    this.serviceNotaFiscal.findById(this.id, this.idNota).subscribe(
      (response: any) => {
        this.infoLeilao = response.leilao.numero + " de " + response.leilao.dataAberturaFormatada;
        this.infoLeilaoAberto = response.leilao.aberto;

        this.infoNota = response.numero;
      },
      (error: any) => {
        this.errorMensagem.mostrarError('', error);
      }
    );
  }

}
