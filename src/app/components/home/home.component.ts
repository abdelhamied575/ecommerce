import { Component, OnInit } from '@angular/core';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
import { Products } from 'src/app/shared/interfaces/products';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {



  constructor(
    private _EcomdataService:EcomdataService ,
    private _CartService:CartService,
    private _ToastrService: ToastrService,
    private _WishlistService:WishlistService
    ){}

  products:Products[]=[]
  categories:any[]=[];

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

  addWishList(id:string):void{
    this._WishlistService.addToWishList(id).subscribe({
      next:(response)=>{
        console.log(response)
        // this._CartService.cartNumber.next(response.numOfCartItems);
        //console.log(this._CartService.cartNumber)
        this._ToastrService.success(response.message , 'WishList')
        
      },

      error:(err)=>{
        console.log(err)
      }
    })
  }

  searchTerm:string="";

  categoriesSliderOption: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    autoplay:true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: false
  }

  mainSliderOption: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    autoplay:true,
    items:1,
    nav: false
  }

  ngOnInit(): void {

    //Get All Products 
    this._EcomdataService.getAllProducts().subscribe({
      next:(response)=>{
        this.products=response.data;
      }
    })


    //Get All Categories
    this._EcomdataService.getAllCategories().subscribe({
      next:(response)=>{
        this.categories=response.data;
      }
    })



  }
}
