import {Component, OnInit} from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario.service';


@Component({
 selector: 'myHeader',
 templateUrl:
 './header.component.html'
})

export class HeaderComponent implements OnInit{

    public itemsMenu: any[] = [];
    public email: string = ''; 

    constructor(
        private UsuarioService: UsuarioService
      ) { }
     
    
      ngOnInit() {
        
       this.comprobarLogin();
      }
    
      menuSimple() {
        this.itemsMenu = [ 
          {label: 'Home' , ruta: 'home'},
          {label: 'Blog' , ruta: 'blog'},
          {label: 'Login' , ruta: 'login'}
        ];
        console.log('menu,user',  this.itemsMenu);
      }
    /**
     *
     * Comprobar login
     * @memberof NavbarComponent
     */
    
    comprobarLogin() {
      //this.rellenarMenu();
      this.UsuarioService.logueado.subscribe( resp => {
        //console.log('Observable login ', resp );
        if ( localStorage.getItem('email') == null || localStorage.getItem('email') == undefined ) {
            
        } else {
            if ( localStorage.getItem('email').length >=1 ) {
                this.email = localStorage.getItem('email');
            }
            
        }
        if ( resp == 0 ) {
          this.rellenarMenu();
        } else {
          this.rellenarMenu();
        }
      });
         
      }
    /**
     * Rellenar Menu
     */
      rellenarMenu() {
     /* this.menuAdmin(); */
        if ( localStorage.getItem('role') != null ) {
          if (localStorage.getItem('role').localeCompare('ROLE_ADMIN') == 0) {
            this.menuAdmin();
          } else {
            this.menuUser();
          }
         } else {
           this.menuSimple();
         }
      }
    
      menuAdmin() {
        this.itemsMenu = [ 
          {label: 'Home' , ruta: 'home'},
          {label: 'Blog' , ruta: 'blog'},
          {label: this.email || 'Logout' , ruta: 'login'},
          {label: 'Listado de anuncios' , ruta: 'blog'},
          {label: 'Nuevo Blog' , ruta: 'blog'},
        ];
        console.log('menu,admin',  this.itemsMenu);
      }
    
      menuUser() {
        
        let id = localStorage.getItem('id');
        this.itemsMenu = [ 
          {label: 'Home' , ruta: 'home'},
          {label: 'Poner anuncio' , ruta: 'blog'},
          {label: 'Mis favoritos' , ruta: 'favoritos/' + id},
          {label: 'Mis anuncios' , ruta: 'Mis anuncios'},
          {label: 'Blog' , ruta: 'blog'},
          {label: this.email || 'Logout' , ruta: 'login'
        },
          
        ];
        
      }
    
      logout() {
        //this.UsuarioService.logueado.next(0);
        localStorage.clear();
        
      }
}