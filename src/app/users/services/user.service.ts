import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor( private firestore: AngularFirestore) {}
  getAllUsers():Observable<any[]>{
  return  this.firestore.collection('users').valueChanges()
  }


}
