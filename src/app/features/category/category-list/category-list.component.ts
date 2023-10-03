import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../models/category.model';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  //For Using async pipe declare a Observable type variable
  categories$?: Observable<Category[]>;
  //categoryList: any = []; To bind response to a array
  private getCategorySubscription?: Subscription;
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategory();
  }
}
