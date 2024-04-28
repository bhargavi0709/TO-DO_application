import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from '../../../TO-DO_App/src/app/register/register.component';


import { ReactiveFormsModule } from '@angular/forms';

import { AuthGuard } from '../../../TO-DO_App/src/app/shared/auth.guard';


import { TaskComponent } from './task/task.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [AppComponent, RegisterComponent,TaskComponent,LoginComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
    providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
