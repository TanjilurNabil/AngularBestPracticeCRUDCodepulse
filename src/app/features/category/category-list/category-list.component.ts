import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from '../models/category.model';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  model: Category[] = [];
  //categoryList: any = []; To bind response to a array
  private getCategorySubscription?: Subscription;
  constructor(private cat: CategoryService) {}
  ngOnInit(): void {
    this.getCategoryList();
  }

  getCategoryList() {
    this.getCategorySubscription = this.cat.getCategory().subscribe((data) => {
      this.model = data;
    });
  }
}
