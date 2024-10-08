import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
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
  uploadFile(){
    // this.fireStorage.upload()
  }


}
