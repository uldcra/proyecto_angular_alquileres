import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario.service';


@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {

  public items: any[] = [];
  public showDelete: boolean = true;
  public showFavo: boolean = false;

  constructor(
    private userService: UsuarioService,
    ) { }

  ngOnInit() {
    this.listar();
    
     //this.userService. 
  }

  listar() {
    try {
      let id = localStorage.getItem('id');
      this.userService.getUSer(id).toPromise()
      .then( (resp: any ) => {
        console.log('resp', resp);
        this.items = resp.myAdvertisements;
      });
    } catch (error) {
      
    }
  }

}
