import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from '../models/category.model';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  id: string | null = null;
  paramSubscription?: Subscription;
  category?: Category;
  constructor(
    private route: ActivatedRoute,
    private catgoryService: CategoryService
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
    console.log(this.category);
  }
  ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe();
  }
}
