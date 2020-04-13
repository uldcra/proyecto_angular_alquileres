import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';





@Injectable({
    providedIn: "root"
})

export class AuthAdminService implements CanActivate{

    constructor(
      
    ) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if ( localStorage.getItem('role') ){ 
            try {
              let role: string = localStorage.getItem('role');
              if (  role.localeCompare('ROLE_ADMIN') == 0 ) {
                  return true;
              } else {
                  return false;
              }

            } catch (error) {
                return false;
            }
        }
        return false;
    }


}