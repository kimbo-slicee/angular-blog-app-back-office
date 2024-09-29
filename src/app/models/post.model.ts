import {Category} from "./category.model";

export interface PostModel {
  id?:string;
  title:string;
  permaLink:string;
  excerpt:string;
  category:{
    categoryId:string,
    categoryName:string,
  };
  postImagePath:string;
  content:string;
  isDefeater:boolean;
  views:number;
  status:string;
  createAt:number

}
