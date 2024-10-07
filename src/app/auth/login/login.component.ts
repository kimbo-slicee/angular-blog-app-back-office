import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @ViewChild("password")password!:ElementRef;
  private authService:AuthService=inject(AuthService)
  onSubmit(loginForm:NgForm) {
    const email:string=loginForm.controls['email'].value;
    const password:string=loginForm.controls['password'].value;
    this.authService.login(email,password);

  }
  switchEye(type:string) {
    if(type==='password'){
      this.password.nativeElement.type="text"
    }else if (type==='text'){
      this.password.nativeElement.type="password"

    }
  }
}
