import { Component, ViewChild, ElementRef } from '@angular/core';
import { BlogService } from './service/blog.service';
import { Observable } from 'rxjs';
import {Router,ActivatedRoute} from "@angular/router";
import { Blog } from './entity/blog';

@Component({
    templateUrl:
    './blog-upload.component.html',
})

export class blogUploadComponent {
    @ViewChild('titleInput') titleInput: ElementRef;
    title: string;
    
    @ViewChild('descriptionInput') descriptionInput: ElementRef;
    description: string;


    activatedRoute:ActivatedRoute;
    images: File;
    imagesOnString: string;
    isNew: boolean;
    auxTitle: string;
    auxDescription: string
    blog: Blog;
    id: number;

    constructor(private blogService: BlogService,private router: Router,activatedRoute:ActivatedRoute) {
        const id=activatedRoute.snapshot.params['id'];
        this.id= id;
        if(id){
            this.isNew=false;
            this.blog = new Blog("","");
            blogService.getBlog(id).subscribe(
                blog => this.blog = blog,
                error => console.log(error)
            );
            console.log(this.blog);
        }else{
            this.isNew=true;
        }
    }

    createBlog(filename: string){
        var blog = this.createObjectFromForm();
        this.blogService.addBlog(blog).subscribe(
            () =>  this.router.navigate(['/blog']),
            error => console.log(error)
        );
    }

    updateBlog(filename: string){
        var blog = this.createObjectFromForm();
        this.blogService.editBlog(blog,this.id).subscribe(
            () =>  this.router.navigate(['/blog',this.id]),
            error => console.log(error)
        );
    }

    createObjectFromForm(){
        this.blogService.uploadFile(this.images);
        this.title = this.titleInput.nativeElement.value;
        this.description = this.descriptionInput.nativeElement.value;
        var blog = new Blog(this.title, this.description);
        return blog;
    }
}