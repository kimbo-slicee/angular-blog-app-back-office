import {Component, inject, OnInit, signal, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {CategoryServiceService} from "../../services/category-service.service";
import {Category} from "../../models/catecorie.model";
import {ToastrService} from "ngx-toastr";
import {SwalPortalTargets} from "@sweetalert2/ngx-sweetalert2";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit{
  private categoryServices:CategoryServiceService=inject(CategoryServiceService);
  private toastrService:ToastrService=inject(ToastrService);
  public readonly swalTargets:SwalPortalTargets= inject(SwalPortalTargets);
  public categoriesList!:any;
  private id!:string;
  @ViewChild("categoryForm")form!:NgForm;
  public editMode:boolean=false;
  ngOnInit(): void {
    this.categoryServices.getAllData().subscribe({
      next:(data)=>this.categoriesList=data,
      error:(err)=>console.log(err)
    })
  }
  addOrEditeCategory(categoryForm:NgForm) {
      let category:Category={
        category:categoryForm.value.category,
      }
    if(!this.editMode){
      this.categoryServices.postCategory(category).then((docRef)=>{
        this.toastrService.success("Category inserted successfully ")
      }).catch((reason)=>console.log(reason))
    }
    else {
      this.categoryServices.updateData(this.id,category).then( _=>{
        this.toastrService.info("Category Edited successfully ✔")
        this.editMode=false;
      }
      )
    }

    categoryForm.reset();
  }

  onEdite(id:string,selectedCategory:string){
    this.id=id
    this.editMode=true
    this.form.setValue({
      category:selectedCategory
    })
  }

  delete(id:string,category:string) {
    this.id=id;
    window.confirm(`Are you sur you want to delete this Category ${category}`)
    this.categoryServices.deleteCategory(id).then(()=>{
      this.toastrService.success("Category Deleted Successful")
      })
  }

  public saveFile(fileName: string): void {
    // ... save file
  }

  public handleDenial(): void {
    // ... don't save file and quit
  }

  public handleDismiss(dismissMethod: string): void {
    // dismissMethod can be 'cancel', 'overlay', 'close', and 'timer'
    // ... do something
  }

}
