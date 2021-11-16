import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrormensageService } from 'src/app/core/server/errormensage.service';
import { SistemaService } from '../../sistema/sistema.service';
import { UsuarioService } from '../usuario.service';


@Component({
  selector: 'app-listar',
  templateUrl: './pagina-listar.component.html',
  styleUrls: ['./pagina-listar.component.css']
})
export class PaginaListarComponent implements OnInit {
  public carregandoGrid: boolean = false;
  public totalRecords: number = 0;
  public dataSouce: any[] = [];
  protected pagNumero = 0;
  protected pagQtd = 10;
  protected pagCampo = 'id';
  public pagOrdem: number = 1;
  protected pagFiltro = '';
  public id: number = 0;
  public nomeUser: string = "";
  sistemas: any[] = [];
  protected idSistema: number = 0;



  constructor(
    private service: UsuarioService,
    private router: Router,
    private errorMensagem: ErrormensageService,
    private route: ActivatedRoute,
    private sistemaService: SistemaService,
  ) { }

  ngOnInit(): void {
    // Recebendo o parametro da rota
    this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];

        this.carregarUser();

        this.carregarSistemas();
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


  public add(idPagina: number) {
    this.carregandoGrid = true;

    this.service.addPaginaAoUsuario(this.id, idPagina).subscribe(
      () => {

        for (var data in this.dataSouce) {
          if (this.dataSouce[data].id == idPagina) {
            this.dataSouce[data].cadastrado = '1';
          }
        }

        this.carregandoGrid = false;
      },
      (error: any) => {
        this.carregandoGrid = false;
        this.errorMensagem.mostrarError('', error);
      }
    );

  }

  public remover(idPagina: number) {
    this.carregandoGrid = true;

    this.service.deletePaginaDoUsuario(this.id, idPagina).subscribe(
      () => {

        for (var data in this.dataSouce) {
          if (this.dataSouce[data].id == idPagina) {
            this.dataSouce[data].cadastrado = '0';
          }
        }

        this.carregandoGrid = false;
      },
      (error: any) => {
        this.carregandoGrid = false;
        this.errorMensagem.mostrarError('', error);
      }
    );

  }


  protected carregarGrid() {
    this.carregandoGrid = true;

    this.service.findByPaginasDoUsuario(this.id, this.idSistema, this.pagNumero, this.pagQtd, this.pagCampo, this.pagOrdem).subscribe(
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


  protected carregarUser() {
    this.service.findById(this.id).subscribe(
      (response: any) => {
        this.nomeUser = response.username;
      },
      (error: any) => {
        this.errorMensagem.mostrarError('', error);
      }
    );
  }



  public voltar() {
    window.history.back()
  }


  protected carregarSistemas() {

    this.sistemaService.findAll(0, 100, 'nome', 1, '').subscribe(
      (res: any) => {
        this.sistemas = res.content;
      },
      (error: any) => {
        this.errorMensagem.mostrarError('', error);
        this.router.navigate(['']);
      }
    );
  }


  onChangeSistema(event: any){
    this.idSistema = event.value.id;

    this.carregarGrid();
  }

}
