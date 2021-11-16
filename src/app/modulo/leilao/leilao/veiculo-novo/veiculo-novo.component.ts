import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrormensageService } from 'src/app/core/server/errormensage.service';
import { LeilaoService } from '../leilao.service';
import localePt from '@angular/common/locales/pt';
import { DatePipe, registerLocaleData } from '@angular/common';
import Swal from 'sweetalert2'
import { LeilaoVeiculoService } from '../leilaoveiculo.service';

registerLocaleData(localePt, 'pt');

@Component({
  selector: 'app-novo',
  templateUrl: './veiculo-novo.component.html',
  styleUrls: ['./veiculo-novo.component.css'],
  providers: [DatePipe]
})
export class VeiculoNovoComponent implements OnInit {
  form!: FormGroup;
  carregando: boolean = false;
  pt: any;
  registro: any = {};
  id: number = 0;

  public infoLeilao: string = "";

  constructor(
    private service: LeilaoService,
    private serviceVeiculo: LeilaoVeiculoService,
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
      placa: new FormControl('', Validators.compose([Validators.maxLength(7)])),
      chassi: new FormControl('', Validators.compose([Validators.maxLength(21)])),
      patio: new FormControl('99999', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])),
      dataApreensao: new FormControl('', Validators.compose([Validators.required])),
      sucata: new FormControl(false),
    });
  }

  //------Mensagem Validação
  getErrorPlaca() {
    if (this.form.controls.placa.hasError('maxlength')) {
      return 'Máx. de 7 caracteres';
    }
    return '';
  }
  getErrorChassi() {
    if (this.form.controls.chassi.hasError('maxlength')) {
      return 'Máx. de 21 caracteres';
    }
    return '';
  }
  getErrorPatio() {
    if (this.form.controls.patio.hasError('required')) {
      return 'Campo Requerido';
    } else if (this.form.controls.patio.hasError('minlength')) {
      return 'Mín. de 3 caracteres';
    } else if (this.form.controls.patio.hasError('maxlength')) {
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

    if ( ! this.isPlacaChassiValidos(this.registro.placa, this.registro.chassi)  ){
      return;
    }


    if (this.form.controls.dataApreensao.dirty) {
      let prazoTemp: Date = this.form.controls.dataApreensao.value;
      let apreensaoFormatado: string = this.datepipe.transform(prazoTemp, 'yyyy-MM-dd')!;

      this.registro.dataApreensao = apreensaoFormatado + 'T03:00:00.000+00:00';
    } else {
      let separandoData = this.form.controls.dataApreensao.value.split('/');

      this.registro.dataApreensao = separandoData[2] + '-' + separandoData[1] + '-' + separandoData[0] + 'T03:00:00.000+00:00';
    }

    //Setando o objeto leilão
    let leilao : any = {};
    leilao.id = this.id;
    this.registro.leilao = leilao;


    this.carregando = true;
    this.serviceVeiculo.new(this.registro).subscribe(
      () => {
        this.carregando = false;
        this.router.navigate(['/leilao/' + this.id + '/veiculo']);
      },
      (error: any) => {
        this.carregando = false;
        this.errorMensagem.mostrarError('', error);
      }
    );

  }

  voltar() {
    this.router.navigate(['/leilao/' + this.id + '/veiculo']);
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

  protected isPlacaChassiValidos(placa: string, chassi: string) {
    let juntandoOsCampos = placa + chassi;

    if (juntandoOsCampos.length == 0) {
      Swal.fire({
        icon: 'error',
        position: 'center',
        title: 'Placa/Chassi precisa ser informado',
        showConfirmButton: true,
        timer: 5000
      });

      return false;
    }
    else if ((placa.length > 0) && (placa.length < 7)) {
      Swal.fire({
        icon: 'error',
        position: 'center',
        title: 'Placa Mín. de 7 caracteres',
        showConfirmButton: true,
        timer: 5000
      });

      return false;
    }
    else if ((chassi.length > 0) && (chassi.length < 17)) {
      Swal.fire({
        icon: 'error',
        position: 'center',
        title: 'Chassi Mín. de 17 caracteres',
        showConfirmButton: true,
        timer: 5000
      });

      return false;
    }

    return true;
  }


}
