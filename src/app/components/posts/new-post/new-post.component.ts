import {Component, inject, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Category} from "../../../models/catecorie.model";
import {CategoryServiceService} from "../../../services/category-service.service";

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css'
})
export class NewPostComponent implements OnInit{
  public reactiveForm!:FormGroup;
  public selectedImage:  ArrayBuffer | null | string ="assets/imageGri.jpg";
  private categoryService:CategoryServiceService=inject(CategoryServiceService);
  public categoryList!:any[];
  ngOnInit(): void {
    this.categoryService.getAllData().subscribe((categories )=>{
      this.categoryList=categories;
    })

    this.reactiveForm=new FormGroup({
    title:new FormControl(null),
    paramLink:new FormControl(null),
    excerpt:new FormControl(null),
    category:new FormControl(null),
    image:new FormControl(null),
    content:new FormControl(null)
    })
  }

  onTitleChange($event:any) {
    const title=$event.target.value;
     this.reactiveForm.patchValue({
       paramLink:title.replace(/\s/g, '-')

     })

  }

  submitForm() {
    console.log(this.reactiveForm)
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file:File = fileInput.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        // Once file is read, set the image source
        this.selectedImage = reader.result;
      };

      reader.readAsDataURL(file);  // Read file as data URL
    }
  }
}
