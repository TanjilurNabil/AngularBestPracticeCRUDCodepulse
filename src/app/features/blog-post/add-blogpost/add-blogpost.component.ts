import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../../category/models/category.model';
import { CategoryService } from '../../category/services/category.service';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css'],
})
export class AddBlogpostComponent implements OnDestroy, OnInit {
  model: AddBlogPost;
  categories$?: Observable<Category[]>;
  createBlogPostSubscription?: Subscription;

  constructor(
    private blogpostService: BlogPostService,
    private router: Router,
    private categoryService: CategoryService
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
      categories: [],
    };
  }
  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategory();
  }

  onFormSubmit(): void {
    console.log(this.model);
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
