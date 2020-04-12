import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

const URL = '/api';

export interface User {
    id?: number;
    name: string;
    roles: string[];
    authdata: string;
}

@Injectable()
export class LoginService {

    isLogged = false;
    isAdmin = false;
    user: User;
    auth: string;

    constructor(private http: HttpClient) {
        if ( localStorage.getItem('currentUser') == null || localStorage.getItem('currentUser') == undefined || localStorage.getItem('currentUser').length <= 0 ) {

        } else {
            let user = JSON.parse(localStorage.getItem('currentUser'));
            if (user) {
                console.log('Logged user');
                this.setCurrentUser(user);
            }
        }
        
    }

    logIn(user: string, pass: string) {

        let auth = window.btoa(user + ':' + pass);
        console.log('auth', auth );
        
        const headers = new HttpHeaders({
            Authorization: 'Basic ' + auth,
            'X-Requested-With': 'XMLHttpRequest',
        });
        console.log('headers', headers);
        console.log('user:', user, 'passw :', pass);
        
        //return this.http.get(this.url +'login?email=' + user.name + '&password=' + user.password );
        return this.http.get<User>('/api/users/loginTres?email=' + user+ '&password=' + pass, { headers })
            .pipe(map(user => {
                console.log('respuesta user', user);
                
                try {
                    if (user) {
                        this.setCurrentUser(user);
                        user.authdata = auth;
                        localStorage.setItem('currentUser', JSON.stringify(user));
                    }
                } catch (error) {
                    console.log('Error en la respuesta', error );
                    
                }

               

                return user;
            }));
    }

    logOut() {

        return this.http.get(URL + '/logOut').pipe(
            map(response => {
                this.removeCurrentUser();
                return response;
            }),
        );
    }

    private setCurrentUser(user: User) {
        this.isLogged = true;
        this.user = user;
        this.isAdmin = this.user.roles.indexOf('ROLE_ADMIN') !== -1;
    }

    removeCurrentUser() {
        localStorage.removeItem('currentUser');
        this.isLogged = false;
        this.isAdmin = false;
    }
}
