import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrormensageService } from 'src/app/core/server/errormensage.service';
import { LeilaoNotaFiscalService } from '../leilaonotafiscal.service';
import { LeilaoNotaFiscalItemService } from '../leilaonotafiscalitem.service';


@Component({
  selector: 'app-listar',
  templateUrl: './nota-fiscal-item-listar.component.html',
  styleUrls: ['./nota-fiscal-item-listar.component.css']
})
export class NotaFiscalItemListarComponent implements OnInit {
  public carregandoGrid: boolean = false;
  public totalRecords: number = 0;
  public dataSouce: any[] = [];
  protected pagNumero = 0;
  protected pagQtd = 10;
  protected pagCampo = 'id';
  public pagOrdem: number = 1;
  protected pagFiltro = '';
  public id: number = 0;
  public idNota: number = 0;

  public infoLeilao: string = "";
  public infoNota: string = "";
  public infoLeilaoAberto: boolean = false;


  constructor(
    private serviceNotaFiscalItem: LeilaoNotaFiscalItemService,
    private serviceNotaFiscal: LeilaoNotaFiscalService,
    private router: Router,
    private errorMensagem: ErrormensageService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    // Recebendo o parametro da rota
    this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];
        this.idNota = params['idNota'];

        this.carregarDadosDaNota();

        this.carregarGrid();
      }
    );
  }


  lazyLoad(event: any) {
    const filtroGlobal = event.globalFilter;

    this.pagNumero = ((event.first + event.rows) / event.rows) - 1;
    this.pagQtd = event.rows;

    if (event.sortField === undefined) {
      this.pagCampo = 'Id';
    } else {
      this.pagCampo = event.sortField;
    }
    this.pagOrdem = event.sortOrder;
    this.pagFiltro = '';


    if (filtroGlobal) {
      this.pagFiltro = filtroGlobal.value;

      this.carregarGrid();
    } else {
      this.carregarGrid();
    }
  }


  protected carregarGrid() {
    this.carregandoGrid = true;

    this.serviceNotaFiscalItem.findAll(this.idNota, this.pagNumero, this.pagQtd, this.pagCampo, this.pagOrdem, this.pagFiltro).subscribe(
      (res: any) => {
        this.dataSouce = res.content;
        this.totalRecords = res.totalElements;

        this.carregandoGrid = false;
      },
      (error: any) => {
        this.carregandoGrid = false;
        this.errorMensagem.mostrarError('', error);
        this.router.navigate(['']);
      }
    );

  }


  protected carregarDadosDaNota() {
    this.serviceNotaFiscal.findById(this.id, this.idNota).subscribe(
      (response: any) => {
        this.infoLeilao = response.leilao.numero + " de " + response.leilao.dataAbertura;
        this.infoLeilaoAberto = response.leilao.aberto;

        this.infoNota = response.numero;
      },
      (error: any) => {
        this.errorMensagem.mostrarError('', error);
      }
    );
  }



  public voltar() {
    this.router.navigate(['/leilao/'+ this.id +'/nota-fiscal/']);
  }

  novo() {
    this.router.navigate(['/leilao/'+ this.id +'/nota-fiscal/'+ this.idNota +'/item-novo/']);
  }

  detalhe(idLeilao: number, idNotaFiscal: number, idItem: number) {
    this.router.navigate(['/leilao/'+ idLeilao +'/nota-fiscal/'+ idNotaFiscal +'/item/detalhe/' + idItem]);
  }

  editar(idLeilao: number, idNotaFiscal: number) {
    this.router.navigate(['/leilao/' + idLeilao + '/nota-fiscal-editar/' + idNotaFiscal]);
  }


}
