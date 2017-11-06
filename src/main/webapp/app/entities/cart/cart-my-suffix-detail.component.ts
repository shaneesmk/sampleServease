import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { CartMySuffix } from './cart-my-suffix.model';
import { CartMySuffixService } from './cart-my-suffix.service';

@Component({
    selector: 'jhi-cart-my-suffix-detail',
    templateUrl: './cart-my-suffix-detail.component.html'
})
export class CartMySuffixDetailComponent implements OnInit, OnDestroy {

    cart: CartMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cartService: CartMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCarts();
    }

    load(id) {
        this.cartService.find(id).subscribe((cart) => {
            this.cart = cart;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCarts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cartListModification',
            (response) => this.load(this.cart.id)
        );
    }
}
