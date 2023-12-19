import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './features/auth/guards/auth.guard';
import { LoginComponent } from './features/auth/login/login.component';
import { AddBlogpostComponent } from './features/blog-post/add-blogpost/add-blogpost.component';
import { BlogpostListComponent } from './features/blog-post/blogpost-list/blogpost-list.component';
import { EditBlogpostComponent } from './features/blog-post/edit-blogpost/edit-blogpost.component';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { EditCategoryComponent } from './features/category/edit-category/edit-category.component';
import { BlogDetailsComponent } from './features/public/blog-details/blog-details.component';
import { HomeComponent } from './features/public/home/home.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: '', component: HomeComponent },
  {
    path: 'blog/:url',
    component: BlogDetailsComponent,
  },
  {
    path: 'admin/categories',
    component: CategoryListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/categories/add',
    component: AddCategoryComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/categories/:id',
    component: EditCategoryComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/blogposts',
    component: BlogpostListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/blogposts/add',
    component: AddBlogpostComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/blogposts/:id',
    component: EditBlogpostComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
