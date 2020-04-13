import { Injectable } from '@angular/core';
import {catchError, map, switchAll} from "rxjs/operators";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpEvent, HttpRequest} from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Blog } from '../entity/blog';

const BASE_URL= "https://localhost:8443/api";

const GET_BLOG = BASE_URL + "/blogs/";
const GET_BLOGS = BASE_URL + "/blogs";
const DELETE_BLOG = BASE_URL + "/blogs/";
const CREATE_BLOG = BASE_URL + "/concept/";



@Injectable()
export class BlogService{
    private urlEndPoint: string = 'https://localhost:8443/api/blogs/';
    private blog:  Blog[] =[];

    constructor(private http: HttpClient) {}

    private handleError(error: any) {
        console.error(error);
        return Observable.throw('Server error (' + error.status + '): ' + error);
    }

    
/* , { withCredentials: true } */
    getBlog(id: number | string): Observable<Blog> {
        return this.http.get<Blog>(GET_BLOG + id )
            .pipe(
                map(response => response),
                catchError(error => this.handleError(error))
            );
    }
/* , { withCredentials: true } */
    getBlogs(page: number, quantity: number): Observable<Blog[]> {
        return this.http.get<Blog[]>(GET_BLOGS + "?page="+page+"&number="+quantity)
        .pipe(map(response => response),
        catchError((error) => this.handleError(error)));
    }

    addBlog(blog: Blog, id:number):Observable<Blog> {
        const body = JSON.stringify(blog);

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        return this.http.post<Blog>(CREATE_BLOG + id, body, {headers})
            .pipe(
                map(response => response),
                catchError(error => this.handleError(error))
            );

    }

    deleteBlog(id:number){
        return this.http.delete<Blog>(DELETE_BLOG +  id)
            .pipe(
                catchError(err => this.handleError(err))
            );
    }
}
