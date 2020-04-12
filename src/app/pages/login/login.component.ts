import { Component, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginService } from 'src/app/auth/login.service';
import { FormGroup, FormControl } from '@angular/forms';
import { UsuarioService } from 'src/app/service/usuario.service';
import { AdvertisementService } from 'src/app/service/advertisement.service';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    public logueado: boolean = false;

    public loginForm: FormGroup = new FormGroup({
      name: new FormControl(''),
      password: new FormControl(''),
    });
  
    constructor(
      private userService: UsuarioService,
      private router: Router
    ) { 
        this.userService.logueado.subscribe( resp => {
            if ( resp == 0) {
              this.logueado = false;
            } else {
              this.logueado = true;
            }
          });

    }
  
    ngOnInit() {
     

      this.userService.comprobarLogin();
    }
  
    
    onSubmit() {
      console.log('loginForm' , this.loginForm.value);
    
      
      this.userService.logIn( this.loginForm.value ).toPromise()
      .then( (resp: any) => {
        // console.log('respuesta', resp);
        if ( resp == null ) {
          console.log('No se ha encontrado usuario');
        } else {
          localStorage.setItem('name', resp.name);
          localStorage.setItem('email', resp.email);
          localStorage.setItem('role', resp.roles[0] );
          localStorage.setItem('id', resp.id );
            
            this.userService.logueado.next(1);
            this.router.navigate(['/home']);
           
        }
        
      }).then( () => {
         
      });
    
    }
  
    logOut() {
      localStorage.clear();
      this.userService.logueado.next(0);
    
    }
}
