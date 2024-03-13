import { Component, OnInit } from '@angular/core';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit{
  
  constructor(private _EcomdataService:EcomdataService){}
  categories:any[]=[];
  ngOnInit(): void {
    //Get All Categories
    this._EcomdataService.getAllCategories().subscribe({
      next:(response)=>{
        console.log(response.data)
        this.categories=response.data;
      }
    })
    
  }

 

}
