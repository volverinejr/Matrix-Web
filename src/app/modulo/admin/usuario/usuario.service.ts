import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment as env } from 'src/environments/environment';
import { debounceTime, distinctUntilChanged, take } from 'rxjs/operators';
import { _isNumberValue } from '@angular/cdk/coercion';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private pathBase: string = "/api/usuarios/usuario/v1";

  constructor(
    protected http: HttpClient,
  ) { }

  public new(model: any) {
    return this.http.post(`${env.HOST}${this.pathBase}`, model).pipe(take(1));
  }

  public update(idUsuario: number, model: any) {
    return this.http.put(`${env.HOST}${this.pathBase}/${idUsuario}`, model).pipe(take(1));
  }

  public delete(idUsuario: number) {
    return this.http.delete(`${env.HOST}${this.pathBase}/${idUsuario}`).pipe(take(1));
  }

  public findById(idUsuario: number) {
    return this.http.get<any>(`${env.HOST}${this.pathBase}/${idUsuario}`).pipe(take(1));
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



  public findByRolesDoUsuario(idUsuario: number, pagina: number, qtd: number, campo: string, ordem: number) {
    if (ordem == -1) {
      campo = '-' + campo;
    }

    let httpParams = new HttpParams();
    httpParams = httpParams.set('page', pagina);
    httpParams = httpParams.set('size', qtd);
    httpParams = httpParams.set('sort', campo);

    return this.http.get<any>(`${env.HOST}${this.pathBase}/${idUsuario}/role`, {
      params: httpParams
    })
      .pipe(
        take(1),
        debounceTime(2000),
        distinctUntilChanged(),
      );
  }


  public addRoleAoUsuario(idUsuario: number, idRole: number) {
    return this.http.post(`${env.HOST}${this.pathBase}/${idUsuario}/role/${idRole}`, null).pipe(take(1));
  }

  public deleteRoleDoUsuario(idUsuario: number, idRole: number) {
    return this.http.delete(`${env.HOST}${this.pathBase}/${idUsuario}/role/${idRole}`).pipe(take(1));
  }




  public findByPaginasDoUsuario(idUsuario: number, idSistema: number, pagina: number, qtd: number, campo: string, ordem: number) {
    if (ordem == -1) {
      campo = '-' + campo;
    }

    let httpParams = new HttpParams();
    httpParams = httpParams.set('page', pagina);
    httpParams = httpParams.set('size', qtd);
    httpParams = httpParams.set('sort', campo);

    return this.http.get<any>(`${env.HOST}${this.pathBase}/${idUsuario}/sistema/${idSistema}/pagina`, {
      params: httpParams
    })
      .pipe(
        take(1),
        debounceTime(2000),
        distinctUntilChanged(),
      );
  }


  public addPaginaAoUsuario(idUsuario: number, idPagina: number) {
    return this.http.post(`${env.HOST}${this.pathBase}/${idUsuario}/pagina/${idPagina}`, null).pipe(take(1));
  }

  public deletePaginaDoUsuario(idUsuario: number, idPagina: number) {
    return this.http.delete(`${env.HOST}${this.pathBase}/${idUsuario}/pagina/${idPagina}`).pipe(take(1));
  }




}
