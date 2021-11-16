import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment as env } from 'src/environments/environment';
import { debounceTime, distinctUntilChanged, take } from 'rxjs/operators';
import { _isNumberValue } from '@angular/cdk/coercion';

@Injectable({
  providedIn: 'root'
})
export class AcessoService {
  private pathBase: string = "/api/usuarios/usuario/v1";

  constructor(
    protected http: HttpClient,
  ) { }

  public carregarMenu() {
    return this.http.get<any>(`${env.HOST}${this.pathBase}/carregar-menu`).pipe(take(1));
  }

}
