import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrormensageService } from 'src/app/core/server/errormensage.service';
import Swal from 'sweetalert2'
import { LeilaoNotaFiscalService } from '../leilaonotafiscal.service';


@Component({
  selector: 'app-detalhe',
  templateUrl: './nota-fiscal-detalhe.component.html',
  styleUrls: ['./nota-fiscal-detalhe.component.css'],
})
export class NotaFiscalDetalheComponent implements OnInit {
  id!: number;
  idNotaFiscal!: number;

  inscricao!: Subscription;
  data: any;
  carregando: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private serviceNotaFiscal: LeilaoNotaFiscalService,
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
          this.idNotaFiscal = params['idNotaFiscal'];


          this.serviceNotaFiscal.findById(this.id, this.idNotaFiscal).subscribe(
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
    this.router.navigate(['/leilao/' + this.id + '/nota-fiscal']);
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
        this.serviceNotaFiscal.delete(this.id, this.data.id).subscribe(
          () => {
            this.router.navigate(['/leilao/' + this.id + '/nota-fiscal']);
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
