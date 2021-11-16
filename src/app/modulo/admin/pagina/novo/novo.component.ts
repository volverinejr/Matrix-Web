import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrormensageService } from 'src/app/core/server/errormensage.service';
import { MenuService } from '../../menu/menu.service';
import { SistemaService } from '../../sistema/sistema.service';
import { PaginaService } from '../pagina.service';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html',
  styleUrls: ['./novo.component.css']
})
export class NovoComponent implements OnInit {
  form!: FormGroup;
  carregando: boolean = false;
  sistemas: any[] = [];
  menus: any[] = [];


  constructor(
    private service: PaginaService,
    private sistemaService: SistemaService,
    private menuService: MenuService,
    private router: Router,
    private errorMensagem: ErrormensageService,
  ) { }

  ngOnInit(): void {
    this.iniciarForm();

    this.carregarSistemas();

    this.carregarMenus();
  }

  iniciarForm() {
    this.form = new FormGroup({
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

  salvar() {
    if (this.form.invalid) {
      return;
    }

    this.carregando = true;
    this.service.new(this.form.value).subscribe(
      () => {
        this.carregando = false;
        this.router.navigate(['/pagina']);
      },
      (error: any) => {
        this.carregando = false;
        this.errorMensagem.mostrarError('', error);
      }
    );

  }

  voltar() {
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
