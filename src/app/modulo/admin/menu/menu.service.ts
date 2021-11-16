import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment as env } from 'src/environments/environment';
import { debounceTime, distinctUntilChanged, take } from 'rxjs/operators';
import { _isNumberValue } from '@angular/cdk/coercion';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private pathBase: string = "/api/usuarios/menu/v1";

  constructor(
    protected http: HttpClient,
  ) { }

  public new(model: any) {
    return this.http.post(`${env.HOST}${this.pathBase}`, model).pipe(take(1));
  }

  public update(idRole: number, model: any) {
    return this.http.put(`${env.HOST}${this.pathBase}/${idRole}`, model).pipe(take(1));
  }

  public delete(idRole: number) {
    return this.http.delete(`${env.HOST}${this.pathBase}/${idRole}`).pipe(take(1));
  }

  public findById(idRole: number) {
    return this.http.get<any>(`${env.HOST}${this.pathBase}/${idRole}`).pipe(take(1));
  }


  public findAll(pagina: number, qtd: number, campo: string, ordem: number, filtro: string) {
    let aplicandoFiltro = '';

    if (filtro != '') {
      if (campo == 'id') {
        if (!_isNumberValue(filtro)) {
          filtro = '1';
        }

        aplicandoFiltro = '/search-id-maior-igual/' + filtro
      }
      else if (campo == 'nome') {
        aplicandoFiltro = '/search-nome/' + filtro
      }
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
}
