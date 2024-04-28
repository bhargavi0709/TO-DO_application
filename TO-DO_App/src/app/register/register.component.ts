import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
[x: string]: any;

constructor(private httpclient:HttpClient){}
  onSubmit(details: {email: string, password: string}){
    console.log(details);
    this.httpclient.post('http://localhost:3000/register',details).subscribe((result:any)=>{
      console.log("Done");
      alert('You have successfully registered. Please login to continue!');
    });
}
}
