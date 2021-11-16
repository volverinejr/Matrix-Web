import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrormensageService } from 'src/app/core/server/errormensage.service';
import Swal from 'sweetalert2'
import { LeilaoVeiculoService } from '../leilaoveiculo.service';


@Component({
  selector: 'app-detalhe',
  templateUrl: './veiculo-detalhe.component.html',
  styleUrls: ['./veiculo-detalhe.component.css'],
})
export class VeiculoDetalheComponent implements OnInit {
  id!: number;
  idVeiculo!: number;

  inscricao!: Subscription;
  data: any;
  carregando: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private serviceVeiculo: LeilaoVeiculoService,
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
          this.idVeiculo = params['idVeiculo'];


          this.serviceVeiculo.findById(this.id, this.idVeiculo).subscribe(
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
    this.router.navigate(['/leilao/' + this.id + '/veiculo']);
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
        this.serviceVeiculo.delete(this.id, this.data.id).subscribe(
          () => {
            this.router.navigate(['/leilao/' + this.id + '/veiculo']);
          },
          (error: any) => {
            this.errorMensagem.mostrarError('', error);
          }
        );
      }
    })

  }

}
