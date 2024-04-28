import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from '../../../TO-DO_App/src/app/register/register.component';
import { AuthGuard } from '../../../TO-DO_App/src/app/shared/auth.guard';
import { TaskComponent } from './task/task.component';



//use routing to switch between login and signup page
const routes: Routes = [
  {
    path:'',canActivate:[AuthGuard], component:TaskComponent ,pathMatch:"full"
  },
  {
    path:'',component:LoginComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'task',
    component:TaskComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
export const routesdemo=[LoginComponent,RegisterComponent];
