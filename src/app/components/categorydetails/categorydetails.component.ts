import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-categorydetails',
  templateUrl: './categorydetails.component.html',
  styleUrls: ['./categorydetails.component.scss']
})
export class CategorydetailsComponent implements OnInit{
  constructor(private _ActivatedRoute:ActivatedRoute ,private _EcomdataService:EcomdataService){}

  idCategory:any;
  
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
        next:(params)=>{
          this.idCategory=params.get('id');
          

          this._EcomdataService.getCategoryDetails(this.idCategory).subscribe({
            next:(response)=>{
              console.log(response.data)
            }
          })


        }
    })


  }
}
