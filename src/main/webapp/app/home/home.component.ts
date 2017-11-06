import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { HomeService } from './home.service';
// import { Product } from '.Product';
import { CartMySuffix } from '../entities/cart/cart-my-suffix.model';
import { Account, LoginModalService, Principal } from '../shared';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.scss'
    ]

})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    id: number;
    customer: any;
    productName: string;
    productId:number;
    product: any;
    in: boolean = true;
    paymentType: string;
    status: string;
    paymentOption: boolean = false;
    count: number = 1;
    //cart: CartMySuffix;
    carts: any;
    total: number = 0;
    list:boolean=true;



    toDos: string[];

    cartProduct() {

        this.homeService.saveCart(this.customer.id, this.product.id, this.count, this.product.name, this.product.price).finally(() => {


        }).
            subscribe((res) => {
                this.homeService.getAllCarts(this.customer.id).finally(() => {


                }).
                    subscribe((res) => {

                        this.carts = res; console.log(res)
                        this.total = 0;
                        for (let cart of this.carts) {
                            this.total += cart.productPrice * cart.quantity;

                            console.log("looop" + this.total)
                        }


                        console.log("resss" + this.carts)
                    }, (error) => console.log(error))


            }, (error) => console.log(error))


    }

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private homeService: HomeService
    ) {
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }
    getCustomer() {

        console.log("eeee" + this.id);
        this.homeService.viewStates(this.id).finally(() => {


        }).
            subscribe((res) => {
                //localStorage.setItem('cId', this.id+"");
                this.customer = res; console.log(res)
                this.in = false;
            }, (error) => console.log(error))
    }
    getProduct() {


        this.homeService.getProduct(this.productId).finally(() => {


        }).
            subscribe((res) => {
                //localStorage.setItem('cId', this.id+"");
                this.product = res; console.log(res)
                this.paymentOption=true;
            }, (error) => console.log(error))
    }
    createCashPayment() {
        this.homeService.savePayment("by cash").finally(() => {


        }).
            subscribe((res) => {
                this.homeService.saveSale(this.customer.name, this.total, "by cash").finally(() => {


                }).
                    subscribe((res) => {
                        this.paymentOption=false;
                        this.status = "Sale Completed";
                        this.list=false;
                    }, (error) => console.log(error))

            }, (error) => console.log(error))

        console.log("successs")
    }
    createPaypalPayment() {


    }
    createCardPayment() { }
}
