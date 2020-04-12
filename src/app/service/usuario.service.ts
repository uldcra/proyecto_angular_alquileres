import { Injectable } from '@angular/core';
import { url_base } from '../config/config';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public url = url_base ;
  public logueado : BehaviorSubject <number> = new BehaviorSubject<number>(0);

  constructor(
    private http: HttpClient
  ) { 
    

  }

  comprobarLogin() {
    if ( localStorage.getItem('role') != null) {
      this.logueado.next(1);
    } 
  }

  /**
   * para realizar un login
   *
   * @param {User} user
   * @returns {Observable<any>}
   * @memberof UsuarioService
   */
  public logIn( user: any ): Observable<any> {
    let auth = window.btoa(user.name + ':' + user.password);
    // console.log('auth', auth );
    
    const headers = new HttpHeaders({
        Authorization: 'Basic ' + auth,
        'X-Requested-With': 'XMLHttpRequest',
    });
    localStorage.setItem('auth', auth);
    //return this.http.get(this.url + 'loginTres?email=' + user.name + '&password=' + user.password );
    return this.http.get(this.url + 'login?email=' + user.name + '&password=' + user.password ,{ headers });
  }

  public logOut( ): Observable<any> {
   
    //return this.http.get(this.url + 'loginTres?email=' + user.name + '&password=' + user.password );
    return this.http.get(this.url + 'logout');
  }

 /*  public loginCorrecto(numero: number) {
    console.log('numero', numero);
    this.logueado.next(numero);
  }
 */
public getUSer(id): Observable<any> {
  // https://localhost:8443/api/users/1
  return this.http.get(this.url + 'users/' + id );
}

  public createUser( user: any): Observable<any>  {

    return this.http.post( this.url + 'users/create', user );
  }

  addFovrites(id, id_advfo){
    return this.http.get(this.url + 'users/addfavo?id=' + id + '&id_advfo=' + id_advfo);
    
  }

 
  removeFavorites(id, id_advfo){
    return this.http.get(this.url + 'users/removeFavo?id=' + id + '&id_advfo=' + id_advfo);

  }
  //https://localhost:8443/api/advertisements/list
  getAddvertisement(){
    return this.http.get(this.url + 'users/favourites?page=0&number=10');
  }

}
