import {NgModule} from "@angular/core";
import { LoginComponent } from './login/login.component';
import {AuthRoutingModule} from "./auth-routing.module";
import {NgClass, NgIf, NgSwitch} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";

@NgModule({
  declarations: [LoginComponent],
  exports: [
    AuthRoutingModule,
    AngularFireAuthModule
  ],
  imports: [
    NgIf,
    FormsModule,
    NgSwitch,
    NgClass
  ]
})
export class AuthModule{

}
