import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  //const usuarioData = JSON.parse(atob(response.token.split('.')[1]));

  constructor() { }

  loginUsuario(model: any) {
    localStorage['username'] = model.apelido;
    localStorage['email'] = model.email;
    localStorage['access_token'] = model.access_token;
    localStorage['refresh_token'] = model.refresh_token;
  }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  getToken() {
    if (localStorage.getItem("access_token")) {
      return localStorage.getItem("access_token");
    }
    else {
      return '';
    }
  }

  getUsuarioLogado() {
    if (localStorage.getItem("username")) {
      return localStorage.getItem("username");
    }
    else {
      return '';
    }
  }

  getUsuarioEmailLogado() {
    if (localStorage.getItem("email")) {
      return localStorage.getItem("email");
    }
    else {
      return '';
    }
  }

  isTokenExpirado(): boolean {
    if (localStorage.getItem("access_token")) {
      const expiry = (JSON.parse(atob(localStorage.getItem("access_token")!.split('.')[1]))).exp;
      return (Math.floor((new Date).getTime() / 1000)) >= expiry;
    }
    else {
      return true;
    }
  }

  getPerfil() {
    if (localStorage.getItem("access_token")) {
      return (JSON.parse(atob(localStorage.getItem("access_token")!.split('.')[1]))).authorities;
    }

    return [];
  }


  getUsuarioAutenticado() {
    return (localStorage.getItem("username") ? true : false);
  }

}
