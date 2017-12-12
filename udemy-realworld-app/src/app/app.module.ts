import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UsersComponent } from './users/users.component';
import { PostsComponent } from './posts/posts.component';
import { HomeComponent } from './home/home.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { UserNewComponent } from './user-new/user-new.component';

import { UserService } from './shared/users/user.service';
import { FormValidationService } from './user-new/form-validation.service';

import { ValidationEmailDirective } from './user-new/validation-email.directive';
import { ValidationPhoneDirective } from './user-new/validation-phone.directive';
import { ValidationCodePostalDirective } from './user-new/validation-codepostal.directive';
import { FilterPipe } from './shared/filter.pipe';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMaterialModule } from './customMaterialModule';

import 'hammerjs';
import { CustomTableComponent } from './custom-table/custom-table.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users/new', component: UserNewComponent },
  { path: 'users/:id', component: UserNewComponent },
  { path: 'posts', component: PostsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundPageComponent }

];
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    UsersComponent,
    PostsComponent,
    HomeComponent,
    NotFoundPageComponent,
    UserNewComponent,
    ValidationEmailDirective,
    ValidationPhoneDirective,
    ValidationCodePostalDirective,
    FilterPipe,
    CustomTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    CustomMaterialModule,
    BrowserAnimationsModule
  ],
  providers: [UserService, FormValidationService],
  bootstrap: [AppComponent],
  exports: [CustomMaterialModule]
})
export class AppModule { }
