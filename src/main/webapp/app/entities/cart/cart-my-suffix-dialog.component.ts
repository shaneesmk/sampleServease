import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CartMySuffix } from './cart-my-suffix.model';
import { CartMySuffixPopupService } from './cart-my-suffix-popup.service';
import { CartMySuffixService } from './cart-my-suffix.service';

@Component({
    selector: 'jhi-cart-my-suffix-dialog',
    templateUrl: './cart-my-suffix-dialog.component.html'
})
export class CartMySuffixDialogComponent implements OnInit {

    cart: CartMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private cartService: CartMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.cart.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cartService.update(this.cart));
        } else {
            this.subscribeToSaveResponse(
                this.cartService.create(this.cart));
        }
    }

    private subscribeToSaveResponse(result: Observable<CartMySuffix>) {
        result.subscribe((res: CartMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: CartMySuffix) {
        this.eventManager.broadcast({ name: 'cartListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-cart-my-suffix-popup',
    template: ''
})
export class CartMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cartPopupService: CartMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cartPopupService
                    .open(CartMySuffixDialogComponent as Component, params['id']);
            } else {
                this.cartPopupService
                    .open(CartMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
