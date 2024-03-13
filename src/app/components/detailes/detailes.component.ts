import { Products } from 'src/app/shared/interfaces/products';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detailes',
  templateUrl: './detailes.component.html',
  styleUrls: ['./detailes.component.scss']
})
export class DetailesComponent implements OnInit{

  constructor(private _ActivatedRoute:ActivatedRoute ,
    private _EcomdataService:EcomdataService ,
    private _CartService:CartService,
    private _ToastrService: ToastrService){}

  idProduct:any;

  productDetails:Products = {} as Products;


  addToCart(id:string):void{
    this._CartService.addToCart(id).subscribe({
      next:(response)=>{
        //console.log(response)
        this._ToastrService.success(response.message , 'Fresh Cart')
      },

      error:(err)=>{
        console.log(err)
      }
    })
  }


  detailesSliderOption: OwlOptions = {
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
        items: 1
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

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.idProduct=params.get('id');

        this._EcomdataService.getProductDetails(this.idProduct).subscribe({
          next:(response)=>{
            this.productDetails=response.data;
          }
        })
      }
    })
  }

}
