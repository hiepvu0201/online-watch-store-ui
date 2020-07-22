import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { faShoppingCart, faTrashAlt, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  private cartService = new CartService();
  carts = [];
  total = 0;
  tableShow = false;
  faTrashAlt = faTrashAlt;
  faShoppingCart = faShoppingCart;
  faArrowCircleLeft = faArrowCircleLeft;
  constructor() {
  }
  ngAfterViewInit(): void {

  }
  ngOnInit(): void {
    this.showCart();
    this.total = this.cartService.sumCart();
    if (this.carts.length !== 0) {
      this.tableShow = true;
    }
  }
  showCart = () => {
    this.carts = this.cartService.showCart();
  }
  removeAllProducts = () => {
    this.carts = this.cartService.removeAll();
    this.total = 0;
    this.tableShow = false;
  }
  removeOneProduct = (id) => {
    this.carts = this.cartService.removeOne(id);
    this.total = this.cartService.sumCart();
    if (this.carts.length !== 0) {
      this.tableShow = true;
    }else {
      this.tableShow = false;
    }
  }
}
