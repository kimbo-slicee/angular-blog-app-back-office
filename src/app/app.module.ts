import {NgModule } from '@angular/core';
import {BrowserModule, provideClientHydration } from '@angular/platform-browser';
import {AppRoutingModule } from './app-routing.module';
import {AppComponent } from './app.component';
import {HeaderComponent } from './layouts/header/header.component';
import {FooterComponent } from './layouts/footer/footer.component';
import {DashboardComponent } from './components/dashboard/dashboard.component';
import {AngularFireModule } from '@angular/fire/compat';
import {environment} from "../environments/environment.prod";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {CategoriesComponent } from './components/categories/categories.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";
import {NewPostComponent} from "./components/posts/new-post/new-post.component";
import {PostsListComponent} from "./components/posts/posts-list/posts-list.component";
import {NgOptimizedImage} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import { PostDetailsComponent } from './components/posts/post-details/post-details.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {SharedModule} from "./shared/shared.module";
import {AuthModule} from "./auth/auth.module";
import {RouterModule} from "@angular/router";
import {UserModule} from "./users/user.module";
import { TruncatePipe } from './pipes/truncate.pipe';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    CategoriesComponent,
    PostsListComponent,
    NewPostComponent,
    PostDetailsComponent,
    NotFoundComponent,
    TruncatePipe,
  ],
  imports: [
    BrowserModule,
    AuthModule,/*import AuthModule Before AppRoutingModule to ride all routers in Auth Module */
    SharedModule,
    UserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    SweetAlert2Module.forRoot(),
    NgOptimizedImage,
    HttpClientModule,
    AngularFireStorageModule,
    RouterModule,




  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
