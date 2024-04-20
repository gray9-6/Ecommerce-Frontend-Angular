import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';

const TOKEN = 'ecom-token'
const USER = 'ecom-user'

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }


  public saveToken(token : string) : void {
    // remove the existing token if it have 
    window.localStorage.removeItem(TOKEN);
    // save the token which is passed in param
    window.localStorage.setItem(TOKEN,token);
  }

  public saveUser(user) : void {
    // remove the existing user if it have 
    window.localStorage.removeItem(USER);
    // save the user which is passed in param
    window.localStorage.setItem(USER,JSON.stringify(user));
  }

  // this method will take the token from the local storgae and return it
  static getToken() : string{
    return localStorage.getItem(TOKEN);
  }

  static getUser() : any{
    return JSON.parse(localStorage.getItem(USER));
  }

  static getUserId() : string{
    const user = this.getUser();

    if(user == null){
      return '';
    }

    return user.userId;
  }

  static getUserRole() : string{
    const user = this.getUser();

    if(user == null){
      return '';
    }
    
    return user.role  ;
  }

  static isAdminLoggedIn() : boolean{

    if(this.getToken == null){
      return false;
    }

    const role: string  = this.getUserRole();
    return role == 'ADMIN';

  }

  static isCustomerLoggedIn() : boolean{

    if(this.getToken == null){
      return false;
    }

    const role: string  = this.getUserRole();
    return role == 'CUSTOMER';  

  }

  static signOut() : void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }

}
