import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Products } from 'src/app/shared/interfaces/products';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{

  constructor(private _EcomdataService:EcomdataService,private _CartService:CartService,private _ToastrService: ToastrService){}
  products:Products[]=[]
  searchTerm:string="";

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

  ngOnInit(): void {

    this._EcomdataService.getAllProducts().subscribe({
      next:(response)=>{
        //console.log(response.data)
        this.products=response.data;
      }
    })


  }

}
