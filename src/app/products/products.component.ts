import { Product } from './../model/product.model';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public products$! : Observable<Array<Product>>;
  public keyword:string = "";

  constructor(private productService: ProductService){}
  
  ngOnInit(): void {
    this.getAllProduct();
  }

  checkproduct(product : Product){
    this.productService.checProduct(product).subscribe({
      next :updateProduct => {
        product.checked = !product.checked;  
      },
      error : err => {
        console.log(err);
      }
    });
    
  }

  getAllProduct(){
    /*this.productService.getProducts()
    .subscribe({
      next : data => {
        this.products = data;
      },
      error : err => {
        console.log(err);
      }
    });*/

    this.products$ = this.productService.getProducts();
  }

  public deleteProduct(product : Product){
    if(confirm("Etes Vous Sure ?"))
    this.productService.deleteProduct(product).subscribe({
      next: value=> {
        this.getAllProduct();
      },
      error : err => {
        console.log(err);
      }
    })
  }

  searchProduct(){
    this.products$ = this.productService.getProductsBykeyWord(this.keyword);

  }

}
