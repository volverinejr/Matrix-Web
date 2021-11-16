import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { environment as env } from 'src/environments/environment';
import { take } from 'rxjs/operators';
import * as EventEmitter from 'events';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    protected http: HttpClient
  ) {
  }

  public testar(model: any) {
    return this.http.post(`${env.HOST}/auth/signin`, model).pipe(take(1));
  }



  public login(model: any) {

    let params = new URLSearchParams();
    params.append('username', model.username);
    params.append('password', model.password);
    params.append('grant_type', 'password');
    params.append('client_id', 'front_end_app');

    let headers =
      new HttpHeaders(
        {
          'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
          'Authorization': 'Basic ' + btoa("front_end_app:12345")
        }
      );
    let options = ({ headers: headers });


    console.log(`Enviando pra rota: ${env.HOST}/api/security/oauth/token`)

    return this.http.post(`${env.HOST}/api/security/oauth/token`,
      params.toString(), options);
  }


  public refreshToken(refreshToken: string) {
    let params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refreshToken);

    let headers =
      new HttpHeaders(
        {
          'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
          'Authorization': 'Basic ' + btoa("front_end_app:12345")
        }
      );
    let options = ({ headers: headers });

    return this.http.post(`${env.HOST}/api/security/oauth/token`,
      params.toString(), options);
  }

}
