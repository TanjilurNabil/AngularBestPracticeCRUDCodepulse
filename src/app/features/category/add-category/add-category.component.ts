import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnDestroy {
  model: AddCategoryRequest;
  private addCategorySubscription?: Subscription;
  constructor(private categoryService: CategoryService) {
    this.model = {
      name: '',
      urlHandle: '',
    };
  }

  onFormSubmit() {
    //Now I have to fetch the model values here and sent over the api through service call
    this.addCategorySubscription = this.categoryService
      .addCategory(this.model)
      .subscribe({
        next: (response) => {
          alert('Category saved successfully!');
        },
      });
  }

  ngOnDestroy(): void {
    this.addCategorySubscription?.unsubscribe;
  }
}
