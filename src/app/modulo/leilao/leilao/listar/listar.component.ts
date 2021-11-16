import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrormensageService } from 'src/app/core/server/errormensage.service';
import { LeilaoService } from '../leilao.service';


@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  public carregandoGrid: boolean = false;
  public totalRecords: number = 0;
  public dataSouce: any[] = [];
  protected pagNumero = 0;
  protected pagQtd = 10;
  protected pagCampo = 'id';
  public pagOrdem: number = 1;
  protected pagFiltro = '';



  constructor(
    private service: LeilaoService,
    private router: Router,
    private errorMensagem: ErrormensageService,
  ) { }

  ngOnInit(): void {
    this.carregarGrid();
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

  novo() {
    this.router.navigate(['/leilao/novo']);
  }

  editar(id: number) {
    this.router.navigate(['/leilao/editar/' + id]);
  }

  detalhe(id: number) {
    this.router.navigate(['/leilao/detalhe/' + id]);
  }


  protected carregarGrid() {
    this.carregandoGrid = true;

    this.service.findAll(this.pagNumero, this.pagQtd, this.pagCampo, this.pagOrdem, this.pagFiltro).subscribe(
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


  veiculosDoLeilao(idleilao: number) {
    this.router.navigate(['/leilao/' + idleilao + '/veiculo']);
  }

  notasDoLeilao(idleilao: number) {
    this.router.navigate(['/leilao/' + idleilao + '/nota-fiscal']);
  }

}
