import { Injectable } from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {PostModel} from "../models/post.model";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {ToastrService} from "ngx-toastr";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(
    private angularFireStorage:AngularFireStorage,
    private angularFireBase:AngularFirestore,
    private toastrService:ToastrService
  ) { }
  upLoadImage(image:File,post:PostModel){
    const filePath:string=`Pictures/${Date.now()}`
    this.angularFireStorage.upload(filePath,image).then((path)=>{
      this.angularFireStorage.ref(filePath).getDownloadURL().subscribe(url=>{
        post.postImagePath=url;
        this.savePost(post)
        });

    })

  }
  private savePost(post:PostModel){
    this.angularFireBase.collection('posts').add(post).then((docRef)=>{
      this.toastrService.success(`posts that Has Id ${docRef} successfully `)
    })
  }
  fetchAllPosts():Observable<any>{
   return  this.angularFireBase.collection('posts').snapshotChanges().pipe(map((action)=>{
       return action.map((a):{id:string,data:unknown}=>{
       const data:unknown =a.payload.doc.data();
       const id:string=a.payload.doc.id
       return  {id,data}
     })
   }))
  }

}
