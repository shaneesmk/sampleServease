import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CartMySuffix } from './cart-my-suffix.model';
import { CartMySuffixPopupService } from './cart-my-suffix-popup.service';
import { CartMySuffixService } from './cart-my-suffix.service';

@Component({
    selector: 'jhi-cart-my-suffix-delete-dialog',
    templateUrl: './cart-my-suffix-delete-dialog.component.html'
})
export class CartMySuffixDeleteDialogComponent {

    cart: CartMySuffix;

    constructor(
        private cartService: CartMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cartService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cartListModification',
                content: 'Deleted an cart'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cart-my-suffix-delete-popup',
    template: ''
})
export class CartMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cartPopupService: CartMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cartPopupService
                .open(CartMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
