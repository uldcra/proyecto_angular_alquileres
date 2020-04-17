import { Injectable } from '@angular/core';
import {catchError, map, switchAll} from "rxjs/operators";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpEvent, HttpRequest} from "@angular/common/http";
import { environment } from "../../environments/environment";


const BASE_URL= environment.baseUrl;

const GET_ADVERTISEMENT = BASE_URL + "/advertisements/";
const DELETE_ADVERTISEMENT = BASE_URL + "/advertisements/";
const CREATE_ADVERTISEMENT = "https://localhost:8443" + BASE_URL + "/advertisements/";

export interface Advertisement{

    id?: number;
    type: string;
    property:string;
    rooms:number;
    bathrooms:number;
    squareMeters:number;
    location:string;
    address:string;
    price:number;
    picture:string;
    images : Array<string>;
    comments: Comment[];
}
//const URL = '/api/recommended/';
const URL = 'https://localhost:8443/api/advertisements/';

@Injectable()
export class AdvertisementService{
    private urlEndPoint: string = 'https://localhost:8443/api/advertisements/';

    constructor(private http: HttpClient) {}

    private handleError(error: any) {
        console.error(error);
        return Observable.throw('Server error (' + error.status + '): ' + error.text());
    }

    uploadFile(file:File, id): Observable<HttpEvent<{}>>{
        let formData = new FormData();
        formData.append("file", file);
        formData.append("id", id);

        const req = new HttpRequest('POST', `${this.urlEndPoint}/images`, formData, {
        reportProgress: true
        });
        
        return this.http.request(req);
    }


    countCities(): Observable<Advertisement[]> {
        return this.http.get<any[]>(URL + 'graph').pipe(
            /*catchError((error) => this.handleError(error))
            */);
    }
    getAdvertisements(): Observable<Advertisement[]> {
        return this.http.get<Advertisement[]>(URL + 'list').pipe(
            /*catchError((error) => this.handleError(error))
            */);
    }
    getAdvertisement(id: number | string) {
        return this.http.get(GET_ADVERTISEMENT + id , { withCredentials: true })
            .pipe(
                map(response => response),
               // catchError(error => this.handleError(error))
            );
    }

    addAdvertisement(advertisement: Advertisement, id:number):Observable<Advertisement> {
        const body = JSON.stringify(advertisement);

        const headers = new HttpHeaders({'Content-Type': 'application/json',});
        return this.http.post<Advertisement>(CREATE_ADVERTISEMENT, body, {headers})
            .pipe(
                //map(response => response),
                catchError(error => this.handleError(error))
            );

    }

    deleteAdvertisement(id:number){
        return this.http.delete<Advertisement>(DELETE_ADVERTISEMENT +  id)
            .pipe(
                //catchError(err => this.handleError(err))
            );
    }
}