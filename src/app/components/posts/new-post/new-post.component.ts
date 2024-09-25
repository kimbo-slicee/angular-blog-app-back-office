import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryServiceService} from "../../../services/category-service.service";
import {PostModel} from "../../../models/post.model";
import {PostService} from "../../../services/post.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css'
})
export class NewPostComponent implements OnInit{
  public  reactiveForm!:FormGroup;
  public  selectedImage:ArrayBuffer | null | string ="assets/back-end-pic.jpeg";
  public  uploadedFile!:File;
  private categoryService:CategoryServiceService=inject(CategoryServiceService);
  private postServices:PostService=inject(PostService);
  private activatedRoute:ActivatedRoute=inject(ActivatedRoute)
  public  categoryList!:any[];
  public isEditeMode:boolean=false;
  public id!:string;

  ngOnInit(): void {
    this.categoryService.getAllData().subscribe(categories => this.categoryList = categories);
    this.reactiveForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      permaLink: new FormControl(null, [Validators.required]),
      excerpt: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
      image: new FormControl(null,Validators.required),
      content: new FormControl(null, Validators.required)
    });
    this.editePost();
  }
  /*this methode Regenerate permaLink */
  onTitleChange($event:any) {
    const title=$event.target.value;
     this.reactiveForm.patchValue({
       permaLink:title.replace(/\s/g, '-')

     })

  }

  onFileSelected($event: Event): void {
    const fileInput:HTMLInputElement = $event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      /*Get the image path from the file input*/
      const file:File = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
      };
      /*Read the file input value */
      reader.readAsDataURL(file);
      this.uploadedFile=file;
    }
  }

  submitForm() {
    const categoryArray = this.reactiveForm.value?.category.split('-')
      const post: PostModel = {
        title: this.reactiveForm.value.title,
        permaLink: this.reactiveForm.value.permaLink,
        category: {
          categoryId: categoryArray[0],
          categoryName: categoryArray[1],
        },
        postImagePath: '',
        excerpt: this.reactiveForm.value.excerpt,
        content: this.reactiveForm.value.content,
        isDefeater: false,
        views: 0,
        status: 'new',
        createAt: new Date(),
    }
    this.postServices.upLoadImage(this.uploadedFile,post,this.isEditeMode,this.id);
    this.reactiveForm.reset();
    this.selectedImage="assets/backend-pic.png";
  }
  editePost(){
    this.isEditeMode=true
    this.activatedRoute.queryParamMap.subscribe((data)=>{
    let id:string|null=data.get('id')
    if(id) this.postServices.fetchOnePost(id).subscribe((post:any)=>{
    this.id=id;
    this.setFromValue(post);
      });

  })

  }
  private setFromValue(post:any){
  this.reactiveForm.setValue({
      title:post.title,
      permaLink:post.permaLink,
      excerpt: post.excerpt,
      category: `${post.categoryId}-${post.categoryName}`,
      image:'',
      content:post.content
    })
    this.selectedImage=post.postImagePath
  }
  // private clearFromValues(){
  //   this.reactiveForm.setValue({
  //     title:'',
  //     permaLink:'',
  //     excerpt: '',
  //     category: '',
  //     image:'',
  //     content:''
  //   })
  // }
}
