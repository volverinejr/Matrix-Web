import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment as env } from 'src/environments/environment';
import { take } from 'rxjs/operators';
import { _isNumberValue } from '@angular/cdk/coercion';

@Injectable({
  providedIn: 'root'
})
export class DetranService {
  private pathBase: string = "/api/leilao/leilao/v1";

  constructor(
    protected http: HttpClient,
  ) { }

  public gerarArquivoSelecao(idLeilao: number) {
    return this.http.patch(`${env.HOST}${this.pathBase}/gerar-arquivo-selecao/${idLeilao}`, null).pipe(take(1));
  }

  public gerarArquivoResultado(idLeilao: number) {
    return this.http.patch(`${env.HOST}${this.pathBase}/gerar-arquivo-resultado/${idLeilao}`, null).pipe(take(1));
  }

  public CargaArquivoRetorno() {
    return this.http.patch(`${env.HOST}${this.pathBase}/carga-arquivo-retorno/`, null).pipe(take(1));
  }

}
