import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrormensageService } from 'src/app/core/server/errormensage.service';
import Swal from 'sweetalert2'
import { UsuarioService } from '../usuario.service';


@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.css'],
})
export class DetalheComponent implements OnInit {
  id!: number;
  inscricao!: Subscription;
  data: any;
  carregando: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private service: UsuarioService,
    private router: Router,
    private errorMensagem: ErrormensageService,
  ) {
  }

  ngOnInit(): void {
    // Recebendo o parametro da rota
    this.inscricao =
      this.route.params.subscribe(
        (params: any) => {
          this.id = params['id'];

          this.service.findById(this.id).subscribe(
            (response: any) => {
              this.data = response;
            },
            (error: any) => {
              this.errorMensagem.mostrarError('', error);
            }
          );

        }
      );
  }

  ngOnDEstroy() {
    this.inscricao.unsubscribe();
  }

  voltar() {
    window.history.back()
  }

  excluir() {
    Swal.fire({
      title: 'Você tem certeza?',
      text: "Você não será capaz de reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, Excluir!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(this.data.id).subscribe(
          () => {
            this.router.navigate(['/permissao']);
          },
          (error: any) => {
            this.errorMensagem.mostrarError('', error);
            this.router.navigate(['']);
          }
        );
      }
    })

  }

}
