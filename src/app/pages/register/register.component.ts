import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private userService: UsuarioService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log('loginForm' , this.registerForm.value);
    this.userService.createUser( this.registerForm.value ).toPromise()
    .then( (resp: any) => {
      console.log('respuesta', resp);
      if ( resp == null || resp.length == 0 ) {
        console.log('Algo ha pasado');
      }
    })
    .then( () => {
      console.log('segunda respuesta' );
    })
    .catch( error => {
      console.error('error algo ha ocurrido', error);
    });
  }

}
