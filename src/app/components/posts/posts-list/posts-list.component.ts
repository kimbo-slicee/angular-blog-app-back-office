import {Component, inject, OnInit} from '@angular/core';
import {PostService} from "../../../services/post.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.css'
})
export class PostsListComponent implements OnInit{
  private postServices:PostService=inject(PostService);
  private toasterService=inject(ToastrService)
  public posts:Array<any>=[];
  public showLoader:boolean=false;
  public lastVisibleDoc: any;
  public limit: number = 5; // Items per page
    ngOnInit(): void {
      this.postList()
    }

  private postList(){
    this.showLoader=true;
    this.postServices.fetchAllPosts(this.limit).subscribe({
      next:(data)=>{
        this.showLoader=false
        this.posts=data
      }});
  }
  /*Remove Post From DataBase */
  deletePost(id:string, datum: any) {
    this.showLoader=true;
    this.postServices.deleteImage(id,datum).then(()=>{
    this.showLoader=false
    this.toasterService.success("Post Deleted Succeed Fully ✔")
    }
    );
  }

}
