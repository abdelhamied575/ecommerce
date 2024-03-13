import { Component } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrls: ['./updatepassword.component.scss']
})
export class UpdatepasswordComponent {


  constructor(private _AuthService:AuthService,private _ToastrService:ToastrService){}

  isLoading:boolean=false;

  updatePasswordFrom:FormGroup=new FormGroup({

    currentPassword:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required]),
    rePassword:new FormControl('',[Validators.required]),
  },{validators:[this.confirmPassword]} as FormControlOptions)

  handleForm():void{
    this.isLoading=true;
    this._AuthService.updatePassword(this.updatePasswordFrom.value).subscribe({
      next:(response)=>{
        //console.log(response)
        this.isLoading=false;
        this._AuthService.logOut();
        this._ToastrService.success(`Password Change ${response.message} please Login again`)
        
      },
      error:(err)=>{
        this._ToastrService.error(err.message)
      }
    })

  }


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

}
