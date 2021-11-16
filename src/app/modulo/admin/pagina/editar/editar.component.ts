import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrormensageService } from 'src/app/core/server/errormensage.service';
import { MenuService } from '../../menu/menu.service';
import { SistemaService } from '../../sistema/sistema.service';
import { PaginaService } from '../pagina.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  id!: number;
  inscricao!: Subscription;
  dataSistema: any;
  form!: FormGroup;
  carregando: boolean = false;
  sistemas: any[] = [];
  menus: any[] = [];



  constructor(
    private route: ActivatedRoute,
    private service: PaginaService,
    private sistemaService: SistemaService,
    private menuService: MenuService,
    private router: Router,
    private errorMensagem: ErrormensageService,
  ) {
  }

  ngOnInit(): void {
    this.iniciarForm();

    this.carregarSistemas();

    this.carregarMenus();


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
      nome: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(100)])),
      rota: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(100)])),
      sistema: new FormControl(null, Validators.compose([Validators.required])),
      menu: new FormControl(null, Validators.compose([Validators.required])),
    });
  }

  //------Mensagem Validação
  getErrorNome() {
    if (this.form.controls.nome.hasError('required')) {
      return 'Campo Requerido';
    } else if (this.form.controls.nome.hasError('minlength')) {
      return 'Mín. de 4 caracteres';
    } else if (this.form.controls.nome.hasError('maxlength')) {
      return 'Máx. de 100 caracteres';
    }
    return '';
  }
  getErrorRota() {
    if (this.form.controls.rota.hasError('required')) {
      return 'Campo Requerido';
    } else if (this.form.controls.rota.hasError('minlength')) {
      return 'Mín. de 4 caracteres';
    } else if (this.form.controls.rota.hasError('maxlength')) {
      return 'Máx. de 100 caracteres';
    }
    return '';
  }
  getErrorSistema() {
    if (this.form.controls.sistema.hasError('required')) {
      return 'Campo Requerido';
    }
    return '';
  }
  getErrorMenu() {
    if (this.form.controls.menu.hasError('required')) {
      return 'Campo Requerido';
    }
    return '';
  }
  //------Mensagem Validação

  atualizar() {
    if (this.form.invalid) {
      return;
    }

    this.carregando = true;
    this.service.update(this.id, this.form.value).subscribe(
      () => {
        this.carregando = false;
        this.router.navigate(['/pagina']);
      },
      (error: any) => {
        this.carregando = false;
        console.log(error.error.message);
      }
    );

  }

  voltar() {
    window.history.back()
  }



  ngOnDEstroy() {
    this.inscricao.unsubscribe();
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


  protected carregarMenus() {

    this.menuService.findAll(0, 100, 'nome', 1, '').subscribe(
      (res: any) => {
        this.menus = res.content;
      },
      (error: any) => {
        this.errorMensagem.mostrarError('', error);
        this.router.navigate(['']);
      }
    );
  }

}
