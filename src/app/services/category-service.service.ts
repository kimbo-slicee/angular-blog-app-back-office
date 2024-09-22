import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentReference} from "@angular/fire/compat/firestore";
import {map} from "rxjs";
import {Category} from "../models/catecorie.model";
@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {
  constructor(private angularFireStore:AngularFirestore) { }
  postCategory(category:Category):Promise<DocumentReference<unknown>>{
    return this.angularFireStore.collection('categories').add(category);
  }
  /* Read And Retrieve */
  getAllData(){
   return  this.angularFireStore.collection('categories').snapshotChanges().pipe(
      /* snapshotChanges return observable */

      map((actions)=>{
       return  actions.map(a=>{
          const  data:unknown=a.payload.doc.data()
          const id=a.payload.doc.id;
          return {id,data}
        })
      })
    )

  }
  updateData(id:string,data:any):Promise<void>{
  return this.angularFireStore.collection('categories').doc(id).update(data)
  }
  deleteCategory(id:string){
    return  this.angularFireStore.doc(`categories/${id}`).delete();
  }

}
