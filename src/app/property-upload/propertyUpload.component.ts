import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from '../auth/login.service';
import { Advertisement, AdvertisementService } from '../service/advertisement.service';
import { HttpEventType } from '@angular/common/http';
import { TdDialogService } from '@covalent/core/dialogs';




@Component({
  selector: 'propertyUpload',
  templateUrl: './propertyUpload.component.html',
  styleUrls: ['./propertyUpload.component.css']
})
export class PropertyUploadComponent implements OnInit {

  id?: number;
  listAdvertisements: Advertisement[];
  private selectedFile: File;
  progres: number = 0;
  advertisement: Advertisement;
  dialogRefConcept: any;

  typeSelect: string[]=['Venta','Alquiler'];
  propertySelect:string[]=['Piso','Casa','Local'];
  roomsSelect:number[]=[1,2,3,4,5,6,7,8,9];
  bathroomsSelect:number[]=[1,2,3,4,5,6];

  constructor(private router: Router, private advertisementService: AdvertisementService,
    public activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    public alert: MatDialog,
    private _dialogService: TdDialogService,
    public loginService: LoginService) { 
      this.advertisement = {type:'',property:'',rooms:0,bathrooms:0,squareMeters:0,location:'',address:'',price:0,picture:'',images:[],comments:[]}
    }

  ngOnInit() {
    /*if(this.loginService.getRolUserLoged()!=2){
        this.router.navigate(['mainPage']);
    }
    this.advertisementService.getAdvertisements().subscribe(
      advertisement => this.advertisement = advertisement,
      error => console.log(error)
    );*/
  }

  newAdvertisement() {
    this.router.navigate(['/advertisement/new']);
  }

  selectPicture(event){
    this.selectedFile = event.target.files[0];
    this.progres = 0;
    console.log(this.selectedFile);
    if(this.selectedFile.type.indexOf('image') < 0){
        this.selectedFile = null;
    }
}

uploadPicture(){
    if(!this.selectedFile){
        console.log;
    }else{
        this.advertisementService.uploadFile(this.selectedFile, this.advertisement.id)
            .subscribe(event =>{
            if (event.type === HttpEventType.UploadProgress) {
                this.progres = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
                let response: any = event.body;
                this.advertisement = response.concept as Advertisement;
              }
        });
    }
}

addAdvertisement() {
    this.advertisementService.addAdvertisement(this.advertisement, this.id).subscribe(
        (res: any) => {
          this.router.navigate(['/home']);
            //this.listAdvertisements = res;
            //this.listAdvertisements = (this.listAdvertisements);
            //console.log(this.advertisement);
        },
        (error: Error) => console.error('error creating new advertisement: ' + error));
        //error1 => console.log(error1)
    
    //this.dialogRefConcept.close();
}
}

