import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private baseUrl = 'http://localhost:8080/api/v1';

  constructor(private httpClient: HttpClient) { }

  getProductList():Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/product/`);
  }

  getCategoryList():Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/category/`);
  }

  getBrandList():Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/brand/`);
  }

  public getCartNum = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    return cart.length;
}
}
