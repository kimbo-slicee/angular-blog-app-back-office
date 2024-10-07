import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angularFireAuth:AngularFireAuth ,
              private toaster:ToastrService,private router:Router,
              private firestore:AngularFirestore
  ) { }
  login(email:string,password:string){
    this.angularFireAuth.signInWithEmailAndPassword(email,password).then(()=>{
      this.router.navigate(['/dashboard']).then(()=>this.toaster.success("Logged Success Fully ✔")
      )
      this.showLoginState()
    }).catch(()=>this.toaster.error("invalid Mail or password "))
  }
  showLoginState(){
    this.angularFireAuth.authState.subscribe((user)=>{
      localStorage.setItem('user',JSON.stringify(user))
      sessionStorage.setItem('user',JSON.stringify(user))
      if(user){
        this.firestore.collection('users').doc(user.uid).set({
          id:user.uid,
          email:user.email,
          name:'default Name',
          date:Date.now(),
          role:'admin',
          phone:'+212 022 203 404'
        })
      }
    })
  }
}
