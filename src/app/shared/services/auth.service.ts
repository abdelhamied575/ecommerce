import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData:any;
  
  baseUrl:string='https://ecommerce.routemisr.com';

  constructor(private _HttpClient:HttpClient , private _Router:Router) { }

  saveUserData(){
    if(localStorage.getItem('eToken') != null){
      let encodeToken:any=localStorage.getItem('eToken');
      let decodeToken=jwtDecode(encodeToken);
      this.userData=decodeToken;
      
    }
  }

  setRegister(userData:object):Observable<any>
  {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/signup`,userData)
  }

  setLogin(userData:object):Observable<any>
  {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/signin`,userData)
  }

  logOut():void{
    localStorage.removeItem('eToken');
    this._Router.navigate(['/login'])
  }

  updatePassword(userData:object):Observable<any>{
    return this._HttpClient.put(`${this.baseUrl}/api/v1/users/changeMyPassword`,userData)
  }

  sendEmail(userEmail:object):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/forgotPasswords`,userEmail)
  }

  getResetCode(userCode:object):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/verifyResetCode`,userCode)
  }

  resetPassword(userData:object):Observable<any>{
    return this._HttpClient.put(`${this.baseUrl}/api/v1/auth/resetPassword`,userData)
  }


}
