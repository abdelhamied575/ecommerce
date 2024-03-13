import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private _AuthService:AuthService , private _Router:Router,private _FormBuilder:FormBuilder){}

  msError:string=''

  isLoading:boolean=false;

  // loginForm:FormGroup=new FormGroup({
  //   email:new FormControl(null,[Validators.required,Validators.email]),
  //   password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)])
  // });

  loginForm:FormGroup=this._FormBuilder.group({
    email:[null,[Validators.required,Validators.email]],
    password:[null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]]
  })

  handleForm():void
  {
    
    if(this.loginForm.valid){
      this.isLoading=true;
      this._AuthService.setLogin(this.loginForm.value).subscribe({
        
        next:(response)=>{

          if(response.message=='success'){
            this.isLoading=false;

            localStorage.setItem('eToken',response.token);

            this._AuthService.saveUserData();

            this._Router.navigate(['/home']);
          }
        },

        error:(err:HttpErrorResponse)=>{

            this.isLoading=false;
            this.msError=err.error.message;
        }
  
      })
    }
    else{
      this.loginForm.markAllAsTouched();
    }
    

  }

}
