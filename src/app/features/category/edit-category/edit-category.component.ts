import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from '../models/category.model';
import { UpdateCategoryRequest } from '../models/update-category-request.model';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  id: string | null = null;
  paramSubscription?: Subscription;
  editCategorySubscription?: Subscription;
  category?: Category;
  constructor(
    private route: ActivatedRoute,
    private catgoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.paramSubscription = this.route.paramMap.subscribe({
      next: (paramMap) => {
        this.id = paramMap.get('id');
        if (this.id) {
          //get the data from the API for this categoryId
          this.catgoryService.getCategoryById(this.id).subscribe({
            next: (response) => {
              this.category = response;
            },
          });
        }
      },
    });
  }
  onFormSubmit() {
    const updateCategoryRequest: UpdateCategoryRequest = {
      name: this.category?.name ?? '',
      urlHandle: this.category?.urlHandle ?? '',
    };
    //Pass this category to Service
    if (this.id) {
      this.editCategorySubscription = this.catgoryService
        .updateCategory(this.id, updateCategoryRequest)
        .subscribe({
          next: (Response) => {
            this.router.navigateByUrl('/admin/categories');
          },
        });
    }
  }
  onDelete(): void {
    if (this.id) {
      this.catgoryService.deleteCategory(this.id).subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/categories');
        },
      });
    }
  }
  ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe();
    this.editCategorySubscription?.unsubscribe();
  }
}
