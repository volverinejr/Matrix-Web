import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrormensageService } from 'src/app/core/server/errormensage.service';
import { LeilaoService } from '../leilao.service';
import { LeilaoVeiculoService } from '../leilaoveiculo.service';


@Component({
  selector: 'app-listar',
  templateUrl: './veiculo-listar.component.html',
  styleUrls: ['./veiculo-listar.component.css']
})
export class VeiculoListarComponent implements OnInit {
  public carregandoGrid: boolean = false;
  public totalRecords: number = 0;
  public dataSouce: any[] = [];
  protected pagNumero = 0;
  protected pagQtd = 10;
  protected pagCampo = 'id';
  public pagOrdem: number = 1;
  protected pagFiltro = '';
  public id: number = 0;

  public infoLeilao: string = "";
  public infoLeilaoAberto: boolean = false;


  constructor(
    private service: LeilaoService,
    private serviceVeiculo: LeilaoVeiculoService,
    private router: Router,
    private errorMensagem: ErrormensageService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    // Recebendo o parametro da rota
    this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];

        this.carregarLeilao();

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

    this.serviceVeiculo.findAll(this.id, this.pagNumero, this.pagQtd, this.pagCampo, this.pagOrdem, this.pagFiltro).subscribe(
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


  protected carregarLeilao() {
    this.service.findById(this.id).subscribe(
      (response: any) => {
        this.infoLeilao = response.numero + " de " + response.dataAbertura;
        this.infoLeilaoAberto = response.aberto;
      },
      (error: any) => {
        this.errorMensagem.mostrarError('', error);
      }
    );
  }



  public voltar() {
    this.router.navigate(['/leilao']);
  }

  novo() {
    this.router.navigate(['/leilao/' + this.id + '/veiculo-novo']);
  }

  detalhe(idLeilao: number, idVeiculo: number) {
    this.router.navigate(['/leilao/' + idLeilao + '/veiculo-detalhe/' + idVeiculo]);
  }


}
