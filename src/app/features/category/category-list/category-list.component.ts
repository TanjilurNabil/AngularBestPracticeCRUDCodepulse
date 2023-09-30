import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  //model: CategoryView;
  categoryList: any = [];
  private getCategorySubscription?: Subscription;
  constructor(private cat: CategoryService) {
    // this.model = {
    //   id: 'sdfsdf',
    //   name: 'sdfsdf',
    //   urlHandle: '',
    // };
  }
  ngOnInit(): void {
    this.getCategoryList();
  }

  getCategoryList() {
    this.getCategorySubscription = this.cat.getCategory().subscribe((data) => {
      this.categoryList = data;
    });
  }
}
