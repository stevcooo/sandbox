import { Component, OnInit} from '@angular/core'
import { IProduct } from './product';
import { ProductService } from './product.service';
@Component({
    templateUrl:'./product-list.component.html',
    styleUrls:['./product-list.component.css']
})

export class ProductListComponent implements OnInit{    
    pageTitle:string='Product List!';
    imageWidth:number=50;
    imageMargin:number=2;
    showImage:boolean=false;    
    
    _listFilter: string;
    get listFilter():string{
        return this._listFilter;
    }
    set listFilter(value:string){
        this._listFilter  = value;
        this.filteredProducts=this.listFilter? this.performFilter(this.listFilter) : this.products;
    }

    filteredProducts: IProduct[];
    products:IProduct[] =[];        
    errorMessag:string;

    constructor(private _productService: ProductService){

    }

    toggleImage():void{
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        console.log("On init");
        this._productService.getProducts()
            .subscribe(
                products=>{
                    this.products = products
                    this.filteredProducts = this.products;
                },
                error => this.errorMessag = <any>error
            );        
    }

    performFilter(filterBy:string): IProduct[] {
        filterBy= filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct)=>
            product.productName.toLocaleLowerCase().indexOf(filterBy) !==-1 );
    }

    onRatingClicked(message:string):void{
        this.pageTitle = "ProductList"+message;
    }
}
