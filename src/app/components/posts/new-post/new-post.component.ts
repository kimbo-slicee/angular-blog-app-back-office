import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryServiceService} from "../../../services/category-service.service";
import {PostModel} from "../../../models/post.model";
import {PostService} from "../../../services/post.service";
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css'
})
export class NewPostComponent implements OnInit{
  public reactiveForm!:FormGroup;
  public selectedImage:ArrayBuffer | null|undefined | string ="assets/back-end-pic.jpeg";
  public uploadedFile!:File;
  public categoryList!:any[];
  public isEditeMode:boolean=false;
  public id!:string;
  public isLoading: boolean=false;
  // field for testes;
  public file:File|string="assets/back-end-pic.jpeg"
  constructor(private categoryService:CategoryServiceService,
              private postServices:PostService,
              private activatedRoute:ActivatedRoute
              ,private toastrService:ToastrService){}
  ngOnInit(): void {
    this.categoryService.getAllData().subscribe(categories => this.categoryList = categories);
    this.reactiveForm = this.formInitializer()
    this.activatedRoute.queryParamMap.subscribe((data)=>{
      if (data.get('id')) this.editePost();
    })
  }
  /*this methode Regenerate permaLink */
  onTitleChange($event:any) {
    const title=$event.target.value;
     this.reactiveForm.patchValue({
       permaLink:title.replace(/\s/g, '-')

     })

  }
  /*Get Image value */
  onFileSelected($event: Event): void {
    const fileInput:HTMLInputElement = $event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      /*Get the image path from the file input*/
      const file:File = fileInput.files[0];
      const reader = new FileReader();
      /*Read the file input value as image of base 64*/
      reader.readAsDataURL(file);
      reader.onload = (e:ProgressEvent<FileReader>) => {
        // e.target?.result it's the path of the file in your local machine
        this.selectedImage =e.target?.result ;
      };
      this.uploadedFile=file;
      /*err reading file */
      reader.onerror=(e)=>{
        console.log('Error reading file:', e);
        }
    }
  }

  submitForm() {
    this.isLoading=true;
    const post:PostModel=this.postValue();
    this.postServices.upLoadImage(this.uploadedFile,post,this.isEditeMode,this.id).then(()=>{
      this.isLoading=false;
      this.toastrService.success(this.isEditeMode?'Post Edited Success Fully ✔':'Post Edited Success Fully ✔')
    });
    this.reactiveForm.reset();
    this.selectedImage="assets/back-end-pic.jpeg";
    this.isEditeMode=false;
  }
  editePost(){
    this.isEditeMode=this.isEditeMode=true
    this.activatedRoute.queryParamMap.subscribe((data)=>{
    let id:string|null=data.get('id')
    if(id) this.postServices.fetchOnePost(id).subscribe((post:any)=>{
    this.isEditeMode=false
    this.id=id;
    this.setFromValue(post);
      });

  })

  }
  /**
   * formInitializer Create new instance of FormGroup;
   * */
  private formInitializer(){
    return new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      permaLink: new FormControl(null, [Validators.required]),
      excerpt: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
      image: new FormControl(null,Validators.required),
      content: new FormControl(null, Validators.required),
    });
  }
  /**
   * this Methode set the Value of the Form on the Update Mode
   * */
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
  /**
   * - create a new instance of postModel
   * - use this Value for Updating or create new post
   * */
  private postValue():PostModel{
    const categoryArray = this.reactiveForm.value?.category.split('-')
   return {
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
  }


}
