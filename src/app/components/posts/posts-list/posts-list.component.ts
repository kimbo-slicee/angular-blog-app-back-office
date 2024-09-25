import {Component, inject, OnInit} from '@angular/core';
import {PostService} from "../../../services/post.service";
import {PostModel} from "../../../models/post.model";

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.css'
})
export class PostsListComponent implements OnInit{
  private postServices:PostService=inject(PostService);
  public posts:Array<any>=[];
    ngOnInit(): void {
      this.postServices.fetchAllPosts().subscribe({
        next:(data)=>{
          console.log(data)
          this.posts=data
        }});

    }


  deletePost(id:string, datum: any) {
    this.postServices.deleteImage(id,datum);
  }
}
