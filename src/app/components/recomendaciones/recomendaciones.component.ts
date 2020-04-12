import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario.service';



@Component({
  selector: 'app-recomendaciones',
  templateUrl: './recomendaciones.component.html',
  styleUrls: ['./recomendaciones.component.css']
})
export class RecomendacionesComponent implements OnInit {

  @Input() items:any;
  @Input() showDelete: boolean;
  @Input() showFavo: boolean;

  @Output() listar: EventEmitter<any> = new EventEmitter<any>();

  constructor(
     private UsuarioService: UsuarioService 
  ) { }

  ngOnInit() {
    console.log('recomendaciones', this.items);
  }

  agregarFavoritos(id_favo: number ) {
    console.log('id_favo: ', id_favo );
    let id_user = localStorage.getItem('id');
    this.UsuarioService.addFovrites(id_user,id_favo).toPromise()
    .then( resp => {
      //console.log('todo ha ido bien', resp);
      
    })
    .then( () => {})
    .catch( error => {
      console.log('error: ', error);
      
    }); 
    
  }

  deleteFavo(id_favo) {
    let id;
    try {
      id = localStorage.getItem('id');
      this.UsuarioService.removeFavorites( id , id_favo ).toPromise()
      .then( (resp) => {
        console.log('favoritos eliminado ', resp );
        this.listar.emit(true);
      }).catch( error => {
        console.log('error', error );
        
      });
    } catch (error) {
      console.log('no hay id', error);
      
    }

  }

}
