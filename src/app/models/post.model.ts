import {Category} from "./catecorie.model";

export interface PostModel {
  id?:string;
  title:string;
  parmaLink:string;
  excerpt:string;
  category:{
    categoryIs:string,
    categoryName:string,
  };
  postImagePath:string;
  content:string;
  isDefeater:boolean;
  views:number;
  status:string;
  createAt:Date

}
