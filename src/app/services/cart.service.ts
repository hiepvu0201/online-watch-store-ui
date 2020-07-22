import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartArr = [];
  constructor() { }
  public getCart = (id: string) => {

  }
  public addCart = (item) => {
    item.quantity = 1;
    item.price = parseFloat(item.unitPrice);
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    let flag = 0;
    if (cart.length > 0) {
      //  sau khi add 1 product bất kì
      cart.forEach(el => {
        if (el.id === item.id) {
          el.quantity += 1;
          el.price = el.price *  el.quantity;
          flag = 1;
          return;
        }
      });
      if (flag === 0) {
        cart.push(item);
      }
    } else {
      cart.push(item);
    }
    console.log(cart);
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  public sumCart = () => {
    let sum = 0;
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.forEach(item => {
      sum += item.price;
    });
    return sum;
  }
  public removeOne = (id) => {
    let newCart = [];
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.forEach(item => {
      if (item.id === id) {
        newCart = cart.filter(el => el !== item);
        return;
      }
    });
    localStorage.setItem('cart', JSON.stringify(newCart));
    return newCart;
  }
  public removeAll = () => {
    const newCart = [];
    localStorage.setItem('cart', JSON.stringify(newCart));
    return newCart;
  }
  public showCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    return cart;
  }
}
