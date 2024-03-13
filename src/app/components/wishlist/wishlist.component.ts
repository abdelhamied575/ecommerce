import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/services/cart.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit{

  constructor(private _WishlistService:WishlistService,
              private _ToastrService: ToastrService,
              private _CartService:CartService
              ){}
  
  wishData:any[]=[];


  addCart(id:string):void{
    this._CartService.addToCart(id).subscribe({
      next:(response)=>{
        //console.log(response)
        this._CartService.cartNumber.next(response.numOfCartItems);
        //console.log(this._CartService.cartNumber)
        this._ToastrService.success(response.message , 'Fresh Cart')
        
      },

      error:(err)=>{
        console.log(err)
      }
    })
  }

  removeWish(id:string):void{
    this._WishlistService.removeWishList(id).subscribe({
      next:(response)=>{
        this.wishData=response.data
        this._ToastrService.success(response.message , 'removed')
        this._WishlistService.wishNumber.next(response.count)
      }
    })
  }


  ngOnInit(): void {
    
    this._WishlistService.getAllWishList().subscribe({
      next:(response)=>{
        console.log(response)
        this.wishData=response.data
      },
      error:(err)=>{
        console.log(err)
      }
    })

  }


}
