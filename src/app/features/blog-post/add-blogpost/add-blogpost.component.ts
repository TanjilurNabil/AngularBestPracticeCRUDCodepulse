import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css'],
})
export class AddBlogpostComponent implements OnDestroy {
  model: AddBlogPost;
  createBlogPostSubscription?: Subscription;
  constructor(
    private blogpostService: BlogPostService,
    private router: Router
  ) {
    this.model = {
      title: '',
      shortDescription: '',
      urlHandle: '',
      content: '',
      featuredImageUrl: '',
      author: '',
      isVisible: true,
      publishedDate: new Date(),
    };
  }

  onFormSubmit(): void {
    this.createBlogPostSubscription = this.blogpostService
      .createBlogPost(this.model)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('admin/blogposts');
        },
      });
  }

  ngOnDestroy(): void {
    this.createBlogPostSubscription?.unsubscribe();
  }
}