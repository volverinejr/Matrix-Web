import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrormensageService } from 'src/app/core/server/errormensage.service';
import Swal from 'sweetalert2'
import { LeilaoNotaFiscalItemService } from '../leilaonotafiscalitem.service';


@Component({
  selector: 'app-detalhe',
  templateUrl: './nota-fiscal-item-detalhe.component.html',
  styleUrls: ['./nota-fiscal-item-detalhe.component.css'],
})
export class NotaFiscalItemDetalheComponent implements OnInit {
  id!: number;
  idNota!: number;
  idItem!: number;

  inscricao!: Subscription;
  data: any;
  carregando: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private serviceNotaFiscalItem: LeilaoNotaFiscalItemService,
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
          this.idNota = params['idNota'];
          this.idItem = params['idItem'];

          this.serviceNotaFiscalItem.findById(this.idNota, this.idItem).subscribe(
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
    this.router.navigate(['/leilao/' + this.id + '/nota-fiscal/' + this.idNota + '/item']);
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
        this.serviceNotaFiscalItem.delete(this.idItem, this.idNota).subscribe(
          () => {
            this.router.navigate(['/leilao/' + this.id + '/nota-fiscal/' + this.idNota + '/item']);
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
