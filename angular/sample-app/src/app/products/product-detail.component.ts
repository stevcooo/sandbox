import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle:string = "Product detail";
  product: IProduct;

  constructor(private _route: ActivatedRoute,
              private _router: Router ) {}

  ngOnInit() {
    let id = +this._route.snapshot.paramMap.get('id');
    this.pageTitle+=`${id}`;
    this.product ={
      "productId": id,
      "productName": "Saw",
      "productCode": "TBX-0022",
      "releaseDate": "May 15, 2016",
      "description": "15-inch steel blade hand saw",
      "price": 11.55,
      "starRating": 3.7,
      "imageUrl": "http://openclipart.org/image/300px/svg_to_png/27070/egore911_saw.png"
    }
  }

  onBack():void{
    this._router.navigate(['/products']);
  }

}
