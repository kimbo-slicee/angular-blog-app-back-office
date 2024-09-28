import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {CategoriesComponent} from "./components/categories/categories.component";
import {PostsListComponent} from "./components/posts/posts-list/posts-list.component";
import {NewPostComponent} from "./components/posts/new-post/new-post.component";

const routes: Routes = [
  {path:'',component:DashboardComponent},
  {path:'categories',component:CategoriesComponent},
  {path:'posts',component:PostsListComponent},
  {path:'new',component:NewPostComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
