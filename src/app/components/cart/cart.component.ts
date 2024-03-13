import { Products } from './../../shared/interfaces/products';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private _CartService:CartService){}

  cartDetails:any={};

  removeCartItem(id:string):void{
    this._CartService.removeItems(id).subscribe({
      next:(response)=>{
        //console.log(response)
        this.cartDetails=response.data;
        this._CartService.cartNumber.next(response.numOfCartItems)
      },

      error:(err)=>{
        console.log(err)
      }
    })
  }

  changeCount(id:string,count:number):void{
    this._CartService.updateCartProduct(id,count).subscribe({
      next:(response)=>{
        //console.log(response.data)
        this.cartDetails=response.data;
      },

      error:(err)=>{
        console.log(err)
      }
    })
  }

  ngOnInit(): void {
      this._CartService.getUserCart().subscribe({
        next:(response)=>{
          console.log(response.data)
          this.cartDetails=response.data;  //{total Price   , product[{count,Price,product[{....}]}]}
        },
  
        error:(err)=>{
          console.log(err)
        }
      })
  }

}
