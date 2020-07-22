import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { AddProductService } from 'src/app/services/add-product.service';
import { Router } from '@angular/router';
import { faPlus, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  public product: Product;
  name = '';
  slug= '';
  summary ='';
  content = '';
  unitPrice = '';
  unitInStock = '';
  productImages = '';
  categoryId='';
  brandId='';

  //
  public selectedFile;
  public event1;
  imgURL: any;
  receivedImage: any;
  base64Data: any;
  convertedImage: any;
  receiveProduct: any;
  public  onFileChanged(event){
    console.log(event);
    this.selectedFile = event.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) =>{
      this.imgURL = reader.result;
    }

  }

  onUpload(){

    const uploadData = new FormData();
    uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
    console.log(this.selectedFile.name);
    this.HttpClient.post<any>('http://localhost:8080/api/v1/image/add/', uploadData)
      .subscribe(
        res =>{
          console.log(res);
          this.receivedImage = res;
          this.base64Data = this.receivedImage.productImages;
          this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data;
        },

        err =>{
          console.log("Không upload ảnh được!");
          console.log(err);
        }
      )
  }

  //

  constructor(
    private addProductService: AddProductService,
    private router: Router,
    private HttpClient: HttpClient
  ) { }

  clickSubmit () {
    console.log(this.name);
    this.addProductService.addProduct(this.name, this.slug,this.summary,
       this.content, this.unitPrice,
       this.unitInStock, this.productImages, this.categoryId, this.brandId).subscribe(
        res =>{
          console.log(res);
          this.receiveProduct = res;
          console.log(this.receiveProduct.id);
          this.onUpload()
          this.router.navigateByUrl('/')
        },

        err =>{
          console.log(err);
        }
       );

  }

  ngOnInit(): void {
  }

  faPlus = faPlus;
  faArrowCircleLeft = faArrowCircleLeft;
}
