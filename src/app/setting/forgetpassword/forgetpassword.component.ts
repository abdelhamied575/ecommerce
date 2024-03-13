import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';
declare let $:any;
@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})



export class ForgetpasswordComponent {

  constructor(private _AuthService:AuthService,private _ToastrService:ToastrService){}

  emailForm:FormGroup=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email])
  })

  VerifyForm:FormGroup=new FormGroup({
    resetCode:new FormControl('',Validators.required)
  })

  setNewPasswordForm:FormGroup=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    newPassword:new FormControl('',Validators.required)
  })

  checkEmail():void{

    this._AuthService.sendEmail(this.emailForm.value).subscribe({
      next:(response)=>{
        //console.log(response)
        $('.fromEmail').removeClass('d-block')
        $('.fromEmail').addClass('d-none')
        $('.verifyForm').removeClass('d-none')
        $('.verifyForm').addClass('d-block')
        this._ToastrService.success(response.message)
      }
    })

  }

  checkVerifyCode():void{
    this._AuthService.getResetCode(this.VerifyForm.value).subscribe({
      next:(response)=>{
        //console.log(response)
        $('.verifyForm').removeClass('d-block')
        $('.verifyForm').addClass('d-none')
        $('.newPassForm').removeClass('d-none')
        $('.newPassForm').addClass('d-block')
        this._ToastrService.success(response.status)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  changePassword():void{
    this._AuthService.resetPassword(this.setNewPasswordForm.value).subscribe({
      next:(response)=>{
        
        console.log(response)
        this._ToastrService.success('Password Change')
      }
    })
  }

}
