import {Component, EventEmitter, Input, Output, output} from '@angular/core';
import {PostModel} from "../../../models/post.model";

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css'
})
export class PostDetailsComponent {
  @Input() post!: PostModel;
  public showPostDetails: boolean =false;
  @Output() showPostDetailsEvent:EventEmitter<boolean>=new EventEmitter<boolean>();
  showPost(){
    this.showPostDetailsEvent.emit(this.showPostDetails)
  }


}
