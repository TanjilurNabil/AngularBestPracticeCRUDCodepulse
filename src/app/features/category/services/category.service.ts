import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { CategoryView } from '../models/get-category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  addCategory(model: AddCategoryRequest): Observable<void> {
    return this.http.post<void>(
      'https://localhost:7176/api/Categories/CreateCategory',
      model
    );
  }

  getCategory(): Observable<CategoryView[]> {
    return this.http.get<any[]>(
      'https://localhost:7176/api/Categories/GetCategory'
    );
  }
}
