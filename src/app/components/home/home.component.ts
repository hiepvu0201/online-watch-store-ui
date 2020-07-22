import { OnInit, Component, ChangeDetectorRef } from '@angular/core';
import { Product } from 'src/app/common/product';
import { Category } from 'src/app/common/category';
import { Brand } from 'src/app/common/brand';
import { HomeService } from 'src/app/services/home.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { faShoppingCart, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { CartService } from 'src/app/services/cart.service';
import { ProductDetailService } from 'src/app/services/product-detail.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalProducts = 0;
  public cart = new CartService();
  products: Observable<Product[]>;
  categories: Observable<Category[]>;
  brands: Observable<Brand[]>;
  faShoppingCart = faShoppingCart;
  faInfoCircle = faInfoCircle;

  constructor(private _homeService: HomeService,
    private eventEmitterService: EventEmitterService,
    public router: Router,
    public _productDetailService: ProductDetailService,
    public cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.listProducts();
    this.listCategories();
    this.listBrands();
  }

  ngAfterViewInit(): void {
    this.listProducts();
    this.totalProducts = this._homeService.getCartNum();
    this.cdr.detectChanges();
  }
  countProducts = () => {
    this.totalProducts = this._homeService.getCartNum();
  }
  addProductToCart = (obj: object) => {
    this.cart.addCart(obj);
    this.totalProducts = this._homeService.getCartNum();
  }
  detailsProduct = (obj: object) => {
    console.log(obj);
    this._productDetailService.showDetailsProduct(obj);

  }

  listProducts=()=>{
    this.products=this._homeService.getProductList();
  }

  listCategories=()=>{
    this.categories=this._homeService.getCategoryList();
  }

  listBrands=()=>{
    this.brands=this._homeService.getBrandList();
  }
}
