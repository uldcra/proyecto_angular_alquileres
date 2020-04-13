import { Component, OnInit } from '@angular/core';
import { BlogService } from './service/blog.service';
import { Blog } from './entity/blog';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    templateUrl:
        './blog-single.component.html',
})

export class blogSingleComponent {
    blog: Blog;
    activatedRoute: ActivatedRoute;

    constructor(private router: Router, activatedRoute: ActivatedRoute, private blogService: BlogService) {
        let id = activatedRoute.snapshot.params['id'];
        this.getBlog(id);
    }


    // ngOnInit(){
    //     const id=this.activatedRoute.snapshot.params['id'];
    //     this.getBlog(id);
    // }

    getBlog(id: number) {
        this.blogService.getBlog(id).subscribe(
            blog => this.blog = blog,
            error => console.log(error)
        );
    }
}