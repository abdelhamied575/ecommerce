import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-nav-blank',
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.scss']
})
export class NavBlankComponent implements OnInit {

  constructor(private _AuthService:AuthService , private _CartService:CartService,private _WishlistService:WishlistService){}

  cartCount:number=0;
  wishCount:number=0;

  ngOnInit(): void {

    this._CartService.cartNumber.subscribe({
        next:(response)=>{
          this.cartCount=response
        }
    });
    
    this._CartService.getUserCart().subscribe({
      next:(response)=>{
        this.cartCount=response.numOfCartItems;
        this._CartService.cartNumber.next(response.numOfCartItems)
      }
    })

    this._WishlistService.wishNumber.subscribe({
      next:(response)=>{
        this.wishCount=response
      }
    })

    this._WishlistService.getAllWishList().subscribe({
      next:(response)=>{
        this.wishCount=response.count;
        this._WishlistService.wishNumber.next(response.count)
      }
    })

  }

  logOutUser():void{
    this._AuthService.logOut();

  }

}
