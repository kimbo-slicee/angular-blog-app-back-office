import {Component, inject, OnInit} from '@angular/core';
import {PostService} from "../../../services/post.service";
import {ToastrService} from "ngx-toastr";
import {PostModel} from "../../../models/post.model";

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.css'
})
export class PostsListComponent implements OnInit{
  private postServices:PostService=inject(PostService);
  private toasterService=inject(ToastrService);
  public posts:Array<any>=[];
  public limit: number = 5;
  public isLoading:boolean=false;
  public post!:PostModel;
  public showPostDetails:boolean=false;
    ngOnInit(): void {
      this.postList()
    }
    showPostDetailsComponent($event:boolean){
      this.showPostDetails=$event;
    }

  private postList(){
    this.isLoading=true;
    this.postServices.fetchAllPosts(this.limit).subscribe((res)=>{
    this.posts=res;
    this.isLoading=false;
    })
  }
  /*Remove Post From DataBase */

  loadMoreData() {
    this.isLoading = true;
    this.postServices.getMoreData(this.limit).subscribe(res => {
      this.posts = [...this.posts, ...res];
      console.log(this.posts)
      this.isLoading = false;
      });
  }

  deletePost(id:string, datum: any) {
    this.isLoading=true;
    this.postServices.deleteImage(id,datum).then(()=>{
    this.isLoading=false
    this.toasterService.info("Post Deleted Succeed Fully ✔")
    }
    );
  }

  showDetails(id:string) {
    this.showPostDetails=true;
    this.postServices.fetchOnePost(id).subscribe((data)=>{
      this.post=data;
      console.log(this.post)
    })
  }


}
