import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { LocalStorageService } from './core/server/local-storage.service';

import { environment as env } from 'src/environments/environment';
import { AcessoService } from './core/server/Acesso.service';
import { ErrormensageService } from './core/server/errormensage.service';

import { PrimeNGConfig } from 'primeng/api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  //  [x: string]: any;
  title = 'Matrix-Web';
  //usuarioLogado: string = "";
  public items: MenuItem[] = [];
  //public ambiente: String = env.AMBIENTE;
  public ambiente: boolean = env.production;



  protected carregou: boolean = false;

  //public menuModel!: MenuModel;

  public dataSouce: any[] = [];



  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private acessoService: AcessoService,
    private errorMensagem: ErrormensageService,
    private primengConfig: PrimeNGConfig
  ) {
  }

  clicked(rota: string) {
    this.router.navigate([rota]);
  }

  ngOnInit(): void {
    this.primengConfig.setTranslation({
      startsWith: 'Começa com',
      contains: 'Contém',
      notContains: 'Não contém',
      endsWith: 'Termina com',
      equals: 'É igual a',
      notEquals: 'Não é igual',
      noFilter: 'Sem filtro',
      lt: 'Menor que',
      lte: 'Menos que ou igual a',
      gt: 'Maior que',
      gte: 'Maior ou igual',
      is: 'É',
      isNot: 'Não é',
      before: 'Antes',
      after: 'Depois',
      clear: 'Limpar',
      apply: 'Aplicar',
      matchAll: 'Combinar tudo',
      matchAny: 'Corresponder a qualquer',
      addRule: 'Adicionar regra',
      removeRule: 'Remover regra',
      accept: 'Sim',
      reject: 'Não',
      choose: 'Escolher',
      upload: 'Upload',
      cancel: 'Cancel',
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
      dayNamesMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      today: 'Hoje',
      weekHeader: 'Wk',
      weak: 'Fraca',
      medium: 'Média',
      strong: 'Forte',
      passwordPrompt: 'informe sua senha',
      emptyMessage: 'Nenhum resultado encontrado',
      emptyFilterMessage: 'Nenhum resultado encontrado',
    });


    if (this.localStorageService.isTokenExpirado()) {
      this.localStorageService.logout();

      this.router.navigate(['/login']);
    }
    /*else {
      this.carregarMenu();
    }*/
  }

  perfil() {
    this.router.navigate(['perfil']);
  }


  public carregarMenu() {
    this.acessoService.carregarMenu().subscribe(
      (res: any) => {

        this.dataSouce = res;

        this.items = [
          /*
          {
            label: 'Administrador',
            items: [
              { label: 'Sistema', command: () => { this.clicked('sistema'); } },
              { label: 'Menu', command: () => { this.clicked('menu'); } },
              { label: 'Página', command: () => { this.clicked('pagina'); } },
              {
                separator: true
              },
              { label: 'Permissão', icon: 'pi pi-key', command: () => { this.clicked('permissao'); } },
              { label: 'Usuário', icon: 'pi pi-users', command: () => { this.clicked('user'); } },
            ]
          },
          */
        ];



        //console.log(this.dataSouce);
        //var anterior: any;
        //var interacao: number = 0;
        var sistemaAnterior = '';
        var menuAnterior = '';
        for (var value of res) {
          if (value.sistema.nome != sistemaAnterior) {
            sistemaAnterior = value.sistema.nome;

            var sistemas = this.dataSouce.filter(function (elemento) {
              return elemento.sistema.nome == value.sistema.nome
            });

            menuAnterior = '';
            var opcaoMenu: any[] = [];
            for (var valueSis of sistemas) {
              if (valueSis.menu.nome != menuAnterior) {
                menuAnterior = valueSis.menu.nome;

                var menus = sistemas.filter(function (elemento) {
                  return elemento.menu.nome == menuAnterior
                });

                var opcoes: any[] = [];
                for (var valueMenu of menus) {
                  let rota = valueMenu.rota;
                  opcoes.push({
                    'label': valueMenu.nome,
                    'command': () => { this.clicked(rota) }
                  });
                }

                opcaoMenu.push({
                  'label': menuAnterior,
                  'items': opcoes
                });

              }

            }
            this.items.push({
              'label': value.sistema.nome,
              'items': opcaoMenu
            });
          }

        }

      },
      (error: any) => {
        this.errorMensagem.mostrarError('', error);
        this.router.navigate(['']);
      }
    );


  }


  getNomeUsuario() {
    return this.localStorageService.getUsuarioLogado();
  }

  getEmailUsuario() {
    return this.localStorageService.getUsuarioEmailLogado();
  }


  logout() {
    this.localStorageService.logout();

    this.router.navigate(['/login']);
  }

  autenticado() {
    let usuarioAutenticado = this.localStorageService.getUsuarioAutenticado();

    if (usuarioAutenticado && !this.carregou) {
      this.carregou = true;
      this.carregarMenu();
    }

    return usuarioAutenticado;
  }
}


