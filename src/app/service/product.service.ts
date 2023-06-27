import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http :HttpClient) { }

  public getProducts():Observable<Array<Product>>{
    return this.http.get<Array<Product>>('http://localhost:3000/products');
  }

  public checProduct(product:any):Observable<Product>{
    return this.http.patch<any>(`http://localhost:3000/products/${product.id}`,
    {checked:!product.checked});
  }

  public deleteProduct(product:Product):Observable<Product>{
    return this.http.delete<Product>(`http://localhost:3000/products/${product.id}`);
  }

  public saveProduct(product:Product):Observable<Product>{
    return this.http.post<Product>(`http://localhost:3000/products`,product);
  }

  public getProductsBykeyWord(key:string):Observable<Array<Product>>{
    return this.http.get<Array<Product>>(`http://localhost:3000/products?name_like=${key}`);
  }
}
