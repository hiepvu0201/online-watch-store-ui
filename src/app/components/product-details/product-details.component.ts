import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/common/product';
import { Category } from 'src/app/common/category';
import { Brand } from 'src/app/common/brand';
import { ProductDetailService } from 'src/app/services/product-detail.service';
import { faShoppingCart, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  products: Observable<Product[]>;
  categories: Observable<Category[]>;
  brands: Observable<Brand[]>;

  name = localStorage.getItem('currentDetailsProductName');
  description = localStorage.getItem('currentDetailsProductDescription');
  id = localStorage.getItem('currentDetailsProductId');
  manufacturer = localStorage.getItem('currentDetailsProductManufacturer');
  unitInStock = localStorage.getItem('currentDetailsProductUnitInStock');
  unitPrice = localStorage.getItem('currentDetailsProductUnitPrice');
  totalProducts = this._homeService.getCartNum();
  faShoppingCart = faShoppingCart;
  faArrowCircleLeft = faArrowCircleLeft;

  constructor(private _productDetailService: ProductDetailService,
    private eventEmitterService: EventEmitterService,
    public router: Router,
    public _homeService: HomeService,
    public cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.listProducts();
    this.listCategories();
    this.listBrands();
  }



  listProducts=()=>{
    this.products=this._productDetailService.getProductList();
  }

  listCategories=()=>{
    this.categories=this._productDetailService.getCategoryList();
  }

  listBrands=()=>{
    this.brands=this._productDetailService.getBrandList();
  }

}
