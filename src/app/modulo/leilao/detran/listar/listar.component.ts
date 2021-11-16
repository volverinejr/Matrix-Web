import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrormensageService } from 'src/app/core/server/errormensage.service';
import { DetranService } from '../detran.service';
import Swal from 'sweetalert2'
import { LeilaoService } from '../../leilao/leilao.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  public carregandoGrid: boolean = false;
  carregando: boolean = false;
  public leiloes!: any[];

  form!: FormGroup;


  constructor(
    private service: DetranService,
    private serviceLeilao: LeilaoService,
    private errorMensagem: ErrormensageService,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      leilao: new FormControl('', Validators.compose([Validators.required])),
    });

    this.carregarLeiloes();
  }

  carregarLeiloes() {

    this.carregandoGrid = true;

    this.serviceLeilao.findByLeiloesAbertos().subscribe(
      (res: any) => {
        this.leiloes = res;

        this.carregandoGrid = false;
      },
      (error: any) => {
        this.carregandoGrid = false;
        this.errorMensagem.mostrarError('', error);
      }
    );
  }


  gerarArquivoSelecao() {
    var leilaoId: number = this.form.controls.leilao.value.id;
    var leilaoNumero: number = this.form.controls.leilao.value.numero;


    Swal.fire({
      title: 'Gerar arquivo de seleção do leilão ' + leilaoNumero + ' ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, Gerar!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.carregando = true;
        this.service.gerarArquivoSelecao( leilaoId ).subscribe(
          () => {
            this.carregando = false;

            Swal.fire({
              title: 'Arquivo de Seleção',
              text: 'Geração iniciada...',
              icon: 'info',
            });

          },
          (error: any) => {
            this.carregando = false;
            this.errorMensagem.mostrarError('', error);
          }
        );

      }
    })

  }


  gerarArquivoResultado() {
    var leilaoId: number = this.form.controls.leilao.value.id;
    var leilaoNumero: number = this.form.controls.leilao.value.numero;

    Swal.fire({
      title: 'Gerar arquivo de RESULTADO do leilão ' + leilaoNumero + ' ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, Gerar!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.carregando = true;
        this.service.gerarArquivoResultado( leilaoId ).subscribe(
          () => {
            this.carregando = false;

            Swal.fire({
              title: 'Arquivo de Resultado',
              text: 'Geração iniciada...',
              icon: 'info',
            });

          },
          (error: any) => {
            this.carregando = false;
            this.errorMensagem.mostrarError('', error);
          }
        );

      }
    })

  }



  cargaArquivoRetorno() {

    Swal.fire({
      title: 'Carga do arquivo de retorno?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, Carregar!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.carregando = true;
        this.service.CargaArquivoRetorno().subscribe(
          () => {
            this.carregando = false;

            Swal.fire({
              title: 'Arquivo de Retorno',
              text: 'Carga iniciada...',
              icon: 'info',
            });

          },
          (error: any) => {
            this.carregando = false;
            this.errorMensagem.mostrarError('', error);
          }
        );

      }
    })

  }






}

