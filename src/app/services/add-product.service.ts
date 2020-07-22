import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddProductService {
  public urlAPI = 'http://localhost:8080/api/v1/product/add'
  public urlImg = 'http://localhost:8080/api/v1/image/add'
  constructor(private http: HttpClient) { }

  addProduct = (
    name : String,
    slug : String,
    summary: String,
    content:String,
    unitPrice: String,
    unitInStock :String,
    productImages: String,
    categoryId: String,
    brandId: String) =>
  {
      return this.http.post<any>(this.urlAPI, {
        name,
        slug,
        summary,
        content,
        unitPrice,
        unitInStock,
        productImages,
        categoryId,
        brandId
      })
  }

  addImage = (
    name : String,
    size : String,
    type: String,
    picByte:String) =>
  {
      return this.http.post<any>(this.urlImg, {
        name,
        size,
        type,
        picByte
      })
  }
}
