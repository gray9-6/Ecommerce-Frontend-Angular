import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UserStorageService } from '../storage/user-storage.service';

// this is the address of our backend application
const BASIC_URL = "http://localhost:8080/"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // this is the address of our backend application
//  BASIC_URL = "http://localhost:8080/"

  constructor(private http: HttpClient,
    private userStorageService: UserStorageService) { }

  register(signupRequest:any) : Observable<any>{
    return this.http.post(BASIC_URL+ "sign-up", signupRequest);
  }

  login(username: string, password: string) : any{
    const headers = new HttpHeaders().set('Content-Type','application/json');
    const body = {username,password}; 

    return this.http.post(BASIC_URL + 'authenticate',body,{headers,observe: 'response'}).pipe(
      map((response) =>{
        //  we are trying to get the authorization from the header, but to do that we need to expose the headers first from our backend
        // add the lines of code in the backend to expose the authorization headers
        const token = response.headers.get('authorization').substring(7);
        const user = response.body;

        if(token && user){
          // save the token and user in the storage
          this.userStorageService.saveToken(token);
          this.userStorageService.saveUser(user);

          return true;
        }

        // if we don't have user and token , return false
        return false;
      })
    )
  }
}
