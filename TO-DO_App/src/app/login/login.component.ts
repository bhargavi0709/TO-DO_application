import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  title = 'AngularTask';
  authservice: any;
  session_id: any;
  session_email:any;
  constructor(private httpclient: HttpClient ,authservice:AuthService, private router: Router) { }

  onSubmit(details: { email: string, password: string }) {
    console.log(details);
    this.httpclient.post('http://localhost:3000/login', details)
      .subscribe((result:any)=>{
        console.log(result);
        if(result.message==="Success!"){
        alert("LoggedIn!");}
          // JSon.parse => objext convert;
          this.router.navigate(['task']);
          console.log(typeof(result));
          // result = JSON.parse(result);
          console.log(result.sessionId);
          this.session_id = result.sessionId;
          console.log(result.email);
          // this.session_email=result.sessionemail;
          localStorage.setItem("session_id", result.sessionId);
          localStorage.setItem("session_email",result.email);


        this.authservice();
      }, (err) => {
        console.log(console.log(err.message))
      })


    };
  }
