import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor( private firestore: AngularFirestore,private fireStorage:AngularFireStorage) {}
  getAllUsers():Observable<any[]>{
  return  this.firestore.collection('users').valueChanges()
  }
  // AddUser
  /** -->[1]:Call FireStorage to store user picture
   *  ---->[2]:Call fireStorage Again to get user picture URl
   *  ------>[3]:Call FireStoreTo Add the new user in fire Store That Base
   *  ------->:[4]:Call Adduser methode in userLise Component
   *
   * */
  uploadFile(){
    // this.fireStorage.upload()
  }
  // EditeUser
  // RemoveUser
  edite(id:string,user:any){

  }


}
