import { Component, OnInit } from '@angular/core';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit{

  constructor(private _EcomdataService:EcomdataService){}

  brands:any[]=[]

  ngOnInit(): void {
      this._EcomdataService.getAllBrands().subscribe({
        next:(response)=>{
          console.log(response.data)
          this.brands=response.data;
        }
      })
  }

}
