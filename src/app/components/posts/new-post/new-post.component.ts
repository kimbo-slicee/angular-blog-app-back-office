import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryServiceService} from "../../../services/category-service.service";
import {PostModel} from "../../../models/post.model";
import {PostService} from "../../../services/post.service";

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css'
})
export class NewPostComponent implements OnInit{
  public  reactiveForm!:FormGroup;
  public  selectedImage:ArrayBuffer | null | string ="assets/backend-pic.png";
  public  uploadedFile!:File;
  private categoryService:CategoryServiceService=inject(CategoryServiceService);
  private postServices:PostService=inject(PostService);
  public  categoryList!:any[];
  ngOnInit(): void {

    this.categoryService.getAllData().subscribe(categories =>this.categoryList=categories);
    this.reactiveForm=new FormGroup({
    title:new FormControl(null,[Validators.required,Validators.minLength(3)]),
    paramLink:new FormControl(null,[Validators.required]),
    excerpt:new FormControl(null,Validators.required),
    category:new FormControl(null,Validators.required),
    image:new FormControl(null,Validators.required),
    content:new FormControl(null,Validators.required)
    })
  }

  onTitleChange($event:any) {
    const title=$event.target.value;
     this.reactiveForm.patchValue({
       paramLink:title.replace(/\s/g, '-')

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
    const newPost: PostModel = {
      title: this.reactiveForm.value.title,
      parmaLink: this.reactiveForm.value.paramLink,
      category: {
        categoryIs: categoryArray[0],
        categoryName: categoryArray[1],
      },
      postImagePath: '',
      excerpt: this.reactiveForm.value.excerpt,
      content: this.reactiveForm.value.content,
      isDefeater: false,
      views: 0,
      status: 'new',
      createAt: new Date()
    }
    this.postServices.upLoadImage(this.uploadedFile,newPost);
    this.reactiveForm.reset();
    this.selectedImage="assets/backend-pic.png";
  }
}
