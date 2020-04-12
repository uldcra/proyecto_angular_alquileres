  import { Component, OnInit } from '@angular/core';
  import { Router } from '@angular/router';
  import { CommonModule } from '@angular/common';
  import { MatDialog } from '@angular/material/dialog';
  import { LoginService } from '../auth/login.service';
  import { Advertisement, AdvertisementService } from '../service/advertisement.service';

  
  
  
  @Component({
    selector: 'advertisements',
    templateUrl: 'advertisement.component.html'
  })
  export class AdvertisementComponent implements OnInit {
  
    advertisements: Advertisement[];
  
    constructor(
      private router: Router, 
      private service: AdvertisementService,
      public loginService: LoginService) { }
  
    ngOnInit() {
      this.service.getAdvertisements().subscribe(
        advertisements => this.advertisements = advertisements,
        error => console.log(error)
      );
    }
  
    newAdvertisement() {
      this.router.navigate(['/advertisement/new']);
    }
  }
  


