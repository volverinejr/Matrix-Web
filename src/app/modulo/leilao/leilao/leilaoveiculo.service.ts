import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment as env } from 'src/environments/environment';
import { debounceTime, distinctUntilChanged, take } from 'rxjs/operators';
import { _isNumberValue } from '@angular/cdk/coercion';

@Injectable({
  providedIn: 'root'
})
export class LeilaoVeiculoService {
  private pathBase: string = "/api/leilao/veiculo/v1";

  constructor(
    protected http: HttpClient,
  ) { }

  public findAll(idLeilao: number, pagina: number, qtd: number, campo: string, ordem: number, filtro: string) {
    let aplicandoFiltro = '';

    if (filtro != '') {
      if (campo == 'id') {
        if (!_isNumberValue(filtro)) {
          filtro = '1';
        }

        aplicandoFiltro = '/search-id-maior-igual/' + filtro + '/leilao/' + idLeilao
      }
      else if (campo == 'placa') {
        aplicandoFiltro = '/search-placa/' + filtro + '/leilao/' + idLeilao
      }
    }
    else {
      aplicandoFiltro = '/leilao/' + idLeilao;
    }

    if (ordem == -1) {
      campo = '-' + campo;
    }

    let httpParams = new HttpParams();
    httpParams = httpParams.set('page', pagina);
    httpParams = httpParams.set('size', qtd);
    httpParams = httpParams.set('sort', campo);

    return this.http.get<any>(`${env.HOST}${this.pathBase}${aplicandoFiltro}`, {
      params: httpParams
    })
      .pipe(
        take(1),
        debounceTime(2000),
        distinctUntilChanged(),
      );
  }

  public findById(idLeilao: number, idVeiculo: number) {
    return this.http.get<any>(`${env.HOST}${this.pathBase}/${idVeiculo}/leilao/${idLeilao}`).pipe(take(1));
  }

  public new(model: any) {
    return this.http.post(`${env.HOST}${this.pathBase}`, model).pipe(take(1));
  }

  public delete(idLeilao: number, idVeiculo: number) {
    return this.http.delete(`${env.HOST}${this.pathBase}/${idVeiculo}/leilao/${idLeilao}`).pipe(take(1));
  }

}
