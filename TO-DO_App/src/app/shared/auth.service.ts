import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private httpclient: HttpClient) { }

  loggedIn: boolean = false;

  IsAuthenticated() {
    //using localstorage saves data in the client browser
    if (localStorage.getItem("sessionId")) {
      this.loggedIn = true;
    }
    // return localStorage.getItem("sessionId");
    return true;
  }

  // IsLoggedIn(): boolean {
  //   if (localStorage.getItem("sessionId")) {
  //     return true;
  //   }
  //   return false;
  // }

}
