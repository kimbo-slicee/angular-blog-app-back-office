import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {UsersListComponent} from "./components/users-list/users-list.component";
import {UserDetailsComponent} from "./components/userdetails/user-details.component";
import {NewUserComponent} from "./components/new-user/new-user.component";
import {UserFromComponent} from "./components/user-from/user-from.component";
const routes:Routes=[
  {path:'users',component:UsersListComponent},
  {path:'user-details',component:UserDetailsComponent},
  {path:'user',component:NewUserComponent,children:[{path:'form',component:UserFromComponent}]}
]
@NgModule({
imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export  class UserRoutingModule{

}
