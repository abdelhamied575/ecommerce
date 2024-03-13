import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private _AuthService:AuthService , private _Router:Router, private _FormBuilder:FormBuilder,
    private _ToastrService: ToastrService){}

  msError:string=''

  isLoading:boolean=false;

  registerForm:FormGroup=new FormGroup({

    name:new FormControl('',[Validators.required,Validators.maxLength(20),Validators.minLength(3)]),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),
    rePassword:new FormControl('',[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),
    phone:new FormControl('',[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)])

  },{validators:[this.confirmPassword]} as FormControlOptions);

  // registerForm:FormGroup=this._FormBuilder.group({
  //   name:[null , [Validators.required,Validators.maxLength(20),Validators.minLength(3)]],
  //   email:[null,[Validators.required,Validators.email]],
  //   password:[null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]],
  //   rePassword:[null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]],
  //   phone:[null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]]
  // },{validators:[this.confirmPassword]})
  

  confirmPassword(group:FormGroup):void{
    const password=group.get('password');
    const repassword=group.get('rePassword')
    if(repassword?.value==null){
      repassword?.setErrors({required:true})
    }
    if(password?.value!=repassword?.value){
      repassword?.setErrors({notMatch:true})
    }

  }


  handleForm():void
  {
    
    if(this.registerForm.valid){
      this.isLoading=true;
      this._AuthService.setRegister(this.registerForm.value).subscribe({
        next:(response)=>{
          if(response.message=='success'){
            this._ToastrService.success(response.message , 'registeration')
            this.isLoading=false;
            this._Router.navigate(['/login'])
            
          }
        },
        error:(err:HttpErrorResponse)=>{
          this._ToastrService.error(err.error.message , 'registeration')
            this.isLoading=false; 
            this.msError=err.error.message


          // console.log(err.error.message)
        }
  
      })
    }
    else{
      
      this.registerForm.markAllAsTouched();
    }
    

  }



}
