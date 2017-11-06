import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { CartMySuffix } from '../entities/cart/cart-my-suffix.model';
import { SERVER_API_URL } from './../app.constants';

@Injectable()
export class HomeService {

  constructor(private http: Http) { }
  private handleError(errorResponse: Response) {
    console.log(errorResponse.statusText);
    return Observable.throw(errorResponse.json().error || 'Server error');

  }

  viewStates(id: number) {
    const url = `/api/customers/${id}`;

    return this.http.get(url)
      .map((resp: Response) => {

        return resp.json();
      }).catch(this.handleError);
  }
  getProduct(id:number) {
    const url = `/api/products/${id}`;

    return this.http.get(url)
      .map((resp: Response) => {

        return resp.json();
      }).catch(this.handleError);
  }

  saveCart(cId: number, pId: number, quantity: number, pName: string, pPrice: number) {

    const url = `/api/save/carts?customerId=` + cId + `&productId=` + pId + `&quantity=` + quantity + `&productName=` + pName + `&productPrice=` + pPrice;

    return this.http.get(url)
      .map((resp: Response) => {

        return resp.json();
      }).catch(this.handleError);
  }
  getAllCarts(cId: number) {

    const url = `/api/getAll/carts/${cId}`;

    return this.http.get(url)
      .map((resp: Response) => {

        return resp.json();
      }).catch(this.handleError);
  }

  savePayment(type: string) {

    const url = `/api/save/payments?type=` + type;

    return this.http.get(url)
      .map((resp: Response) => {

        return resp.json();
      }).catch(this.handleError);
  }
  saveSale(customerName: string, totalCash: number, paymentType: string) {

    const url = `/api/save/sale?customerName=`+customerName+`&totalCash=`+totalCash+`&paymentType=`+paymentType;

    return this.http.get(url)
      .map((resp: Response) => {

        return resp.json();
      }).catch(this.handleError);

  }

}
