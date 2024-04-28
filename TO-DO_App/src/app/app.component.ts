import { Component } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularTask';
  constructor(private httpclient:HttpClient){}

    logOut(){
      localStorage.removeItem("session_id");
      localStorage.removeItem("session_email");
      alert("logged out!")
    }
    isLogin(): boolean{
      if(localStorage.getItem("session_id") && localStorage.getItem("session_email")){
        return true;
      }
      else{
        return false;
      }
    }
}
