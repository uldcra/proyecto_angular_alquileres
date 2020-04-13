import { Component } from '@angular/core';
import { BlogService } from './service/blog.service';
import { Blog } from './entity/blog';
import { Observable } from 'rxjs';

@Component({
    templateUrl:
        './blog-list.component.html',
})

export class blogListComponent {
    blogs: Blog[];
    constructor(private blogService: BlogService) {
        this.blogs = [];
    }

    ngOnInit() {
        this.blogService.getBlogs(0, 5).subscribe(
            blogs => this.blogs = blogs,
            error => console.log(error)
        );
    }

    getBlogs(page: number, quantity: number) {
        this.blogService.getBlogs(page, quantity).subscribe(
            blogs => this.blogs = blogs,
            error => console.log(error)
        );
    }
}