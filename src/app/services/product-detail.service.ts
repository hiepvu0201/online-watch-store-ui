import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {

  public product: Product
  private baseUrl = 'http://localhost:8080/api/v1';

  constructor(private httpClient: HttpClient,
    private router: Router) { }

  public showDetailsProduct = (item) => {
    if (this.checkLocalStorage() == true)
    {
        localStorage.removeItem('currentDetailsProductName');
        localStorage.removeItem('currentDetailsProductDescription');
        localStorage.removeItem('currentDetailsProductId');
        localStorage.removeItem('currentDetailsProductManufacturer');
        localStorage.removeItem('currentDetailsProductUnitInStock');
        localStorage.removeItem('currentDetailsProductName');
        localStorage.removeItem('currentDetailsProductUnitPrice');
        localStorage.removeItem('currentDetailsImgCode');
    }
    this.router.navigateByUrl('/product-detail');
    console.log(item.id)
    // this.product = item;
    localStorage.setItem('currentDetailsProductName', item.productName);
    localStorage.setItem('currentDetailsProductDescription', item.description);
    localStorage.setItem('currentDetailsProductId', item.id);
    localStorage.setItem('currentDetailsProductManufacturer', item.manufacturer);
    localStorage.setItem('currentDetailsProductUnitInStock', item.unitInStock);
    localStorage.setItem('currentDetailsProductUnitPrice', item.unitPrice);
    localStorage.setItem('currentDetailsImgCode', item.imgCode);
    this.product = item;
  }


public checkLocalStorage = () => {
    if (
        localStorage.getItem('currentDetailsProductName') != null ||
        localStorage.getItem('currentDetailsProductDescription') != null ||
        localStorage.getItem('currentDetailsProductId') != null ||
        localStorage.getItem('currentDetailsProductManufacturer') != null ||
        localStorage.getItem('currentDetailsProductUnitInStock') != null ||
        localStorage.getItem('currentDetailsProductUnitPrice') != null
    ){
        return true;
    }
    else {
        return false;
    }
}

  getProductList():Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/product/`);
  }

  getCategoryList():Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/category/`);
  }

  getBrandList():Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/brand/`);
  }
}
