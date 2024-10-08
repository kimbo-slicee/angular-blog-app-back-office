import { NgModule } from '@angular/core';
import {CommonModule, NgFor, NgIf, NgOptimizedImage} from '@angular/common';
import {UserDetailsComponent} from "./components/userdetails/user-details.component";
import {NewUserComponent} from "./components/new-user/new-user.component";
import {UserFromComponent} from "./components/user-from/user-from.component";
import {SharedModule} from "../shared/shared.module";
import {UserRoutingModule} from "./user-routing.module";
import {UsersListComponent} from "./components/users-list/users-list.component";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {ReactiveFormsModule} from "@angular/forms";
@NgModule({
  declarations: [
    UserDetailsComponent,
    NewUserComponent,
    UserFromComponent,
    UsersListComponent

  ],
  imports: [
    AngularFireAuthModule,
    CommonModule,
    SharedModule,
    NgIf,
    NgFor,
    NgOptimizedImage,
    ReactiveFormsModule,


  ],
  exports:[
  UserRoutingModule
  ]
})
export class UserModule { }
