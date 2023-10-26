import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ImageService } from 'src/app/shared/components/image-selector/image.service';
import { Category } from '../../category/models/category.model';
import { CategoryService } from '../../category/services/category.service';
import { BlogPost } from '../models/blog-post.model';
import { UpdateBlogPost } from '../models/update-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';

@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrls: ['./edit-blogpost.component.css'],
})
export class EditBlogpostComponent implements OnInit, OnDestroy {
  id: string | null = null;
  routeSubscription?: Subscription;
  updateBlogPostSuscription?: Subscription;
  getBlogPostSuscription?: Subscription;
  deleteBlogPostSuscription?: Subscription;
  imageSelectSuscription?: Subscription;
  model?: BlogPost;
  categories$?: Observable<Category[]>;
  selectedCategory?: string[];
  isImageSelectorVisible: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private blogPostService: BlogPostService,
    private categoryService: CategoryService,
    private router: Router,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategory();
    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        //Get Blogpost from API
        if (this.id) {
          this.getBlogPostSuscription = this.blogPostService
            .getBlogPostById(this.id)
            .subscribe({
              next: (response) => {
                this.model = response;
                this.selectedCategory = response.categories.map((x) => x.id);
              },
            });
        }
        this.imageSelectSuscription = this.imageService
          .onSelectImage()
          .subscribe({
            next: (response) => {
              if (this.model) {
                this.model.featuredImageUrl = response.url;
                this.isImageSelectorVisible = false;
              }
            },
          });
      },
    });
  }
  onFormSubmit(): void {
    if (this.model && this.id) {
      //convert this model to request object
      const updateBlogPostRequest: UpdateBlogPost = {
        title: this.model.title,
        shortDescription: this.model.shortDescription,
        content: this.model.content,
        urlHandle: this.model.urlHandle,
        author: this.model.author,
        publishedDate: this.model.publishedDate,
        isVisible: this.model.isVisible,
        featuredImageUrl: this.model.featuredImageUrl,
        categories: this.selectedCategory ?? [],
      };
      this.updateBlogPostSuscription = this.blogPostService
        .updateBlogPostById(this.id, updateBlogPostRequest)
        .subscribe({
          next: (response) => {
            this.router.navigateByUrl('/admin/blogposts');
          },
        });
    }
  }
  openImageSelector(): void {
    this.isImageSelectorVisible = true;
  }
  closeImageSelector(): void {
    this.isImageSelectorVisible = false;
  }
  onDelete(): void {
    if (this.id) {
      this.deleteBlogPostSuscription = this.blogPostService
        .deleteBlogPost(this.id)
        .subscribe({
          next: (response) => {
            this.router.navigateByUrl('/admin/blogposts');
          },
        });
    }
  }
  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.updateBlogPostSuscription?.unsubscribe();
    this.getBlogPostSuscription?.unsubscribe();
    this.deleteBlogPostSuscription?.unsubscribe();
    this.imageSelectSuscription?.unsubscribe();
  }
}
