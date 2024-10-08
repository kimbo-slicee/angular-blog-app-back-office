import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent implements OnInit{
 phoneCodeList:any[]=[];
 public src :File|null;
 userReactiveForm:FormGroup;
 ngOnInit(): void {
    this.createForm();
    this.readJson()

 }
 /*Read Json Data*/
  private readJson(){
   const jsonPhoneCodes:Promise<any>=import((`../../../../../json/phone.codes.json`));
    jsonPhoneCodes.then((res)=>{
      for (const resKey in res) {
        this.phoneCodeList.push(res[resKey])
      }
    })
  }
  private createForm(){
  this.userReactiveForm=new FormGroup({
    name:new FormControl('',[Validators.required,Validators.minLength(5)]),
    email:new FormControl(''),
    password:new FormControl(''),
    confirmPass:new FormControl(''),
    codeNumber:new FormControl('+212'),
    phone:new FormControl(''),
    date:new FormControl(null),
    role:new FormControl('Roles')

  })
  }

  uploadFile($event: Event) {
   const fileInput:HTMLInputElement=$event.target as HTMLInputElement
    if(fileInput.files && fileInput.files[0]){
      const file:File|string =fileInput.files[0]
      const reader=new FileReader();
      reader.readAsDataURL(file);
      reader.onload=(e:ProgressEvent<FileReader>)=>{
        this.src= e.target.result as unknown as File
      }

    }

  }
  onSubmit(userFrom: any) {

  }
}
