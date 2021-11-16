import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrormensageService } from 'src/app/core/server/errormensage.service';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html',
  styleUrls: ['./novo.component.css']
})
export class NovoComponent implements OnInit {
  form!: FormGroup;
  carregando: boolean = false;

  constructor(
    private service: MenuService,
    private router: Router,
    private errorMensagem: ErrormensageService,
  ) { }

  ngOnInit(): void {
    this.iniciarForm();
  }

  iniciarForm() {
    this.form = new FormGroup({
      nome: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(100)])),
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
  //------Mensagem Validação

  salvar() {
    if (this.form.invalid) {
      return;
    }

    this.carregando = true;
    this.service.new(this.form.value).subscribe(
      () => {
        this.carregando = false;
        this.router.navigate(['/menu']);
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


}
