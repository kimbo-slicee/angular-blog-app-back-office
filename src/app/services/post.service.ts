import { Injectable } from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {PostModel} from "../models/post.model";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map, Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(
    private angularFireStorage:AngularFireStorage,
    private angularFireBase:AngularFirestore,
  ) { }
  /**
   * Fetch All Posts return type ObserveViable<PostModel>
   * Use fireBase pagination in this Methode
   */
  fetchAllPosts(limit:number):Observable<any>{
    return this.angularFireBase.collection('posts',ref =>
      ref.orderBy('createAt').limit(limit)).snapshotChanges().pipe(map((action)=>{
      return action.map((e):{id:string,data:unknown}=>{
        const data:unknown =e.payload.doc.data();
        const id:string=e.payload.doc.id
        return  {id,data}
      })
    }))
  }
  /**/
  getMoreData(lastDoc: any, limit: number): Observable<any> {
    return this.angularFireBase.collection('your-collection-name', ref =>
      ref.orderBy('createdAt').startAfter(lastDoc).limit(limit)
    ).snapshotChanges();
  }
    async upLoadImage(image: File, post: PostModel, addOrUpdateToggle: boolean, id: string): Promise<any> {
    const filePath: string = `Pictures/${Date.now()}`
    await this.angularFireStorage.upload(filePath, image);
    return this.angularFireStorage.ref(filePath).getDownloadURL().subscribe(url => {
      post.postImagePath = url;
      return addOrUpdateToggle ? this.updatePost(id, post) : this.savePost(post);
    });
  }
  /*Refactoring UPLoadPic Function: the main purpose of refactoring this function that's simplify  */
  upLoadPicturesToFireBase(image:File){
    const filePath:string=`post-pictures/${Date.now()}`
    this.angularFireStorage.upload(filePath,image).snapshotChanges()
  }
   savePost(post:PostModel){
    this.angularFireBase.collection('posts').add(post).then().catch().finally();
  }
  fetchOnePost(id:string){
    return this.angularFireBase.doc(`posts/${id}`).valueChanges()
  }
  updatePost(id:string,updatedPost:PostModel){
     return  this.angularFireBase.collection('posts').doc(id).update(updatedPost)
  }
  async deleteImage(id: string, postImagePath: string):Promise<void> {
    await this.angularFireStorage.storage.refFromURL(postImagePath).delete();
    return await this.deletePost(id);
  }
  deletePost(id:string){
    return this.angularFireBase.collection('posts').doc(id).delete()
  }

}
