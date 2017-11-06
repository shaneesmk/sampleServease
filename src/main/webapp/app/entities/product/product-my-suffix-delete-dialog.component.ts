import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ProductMySuffix } from './product-my-suffix.model';
import { ProductMySuffixPopupService } from './product-my-suffix-popup.service';
import { ProductMySuffixService } from './product-my-suffix.service';

@Component({
    selector: 'jhi-product-my-suffix-delete-dialog',
    templateUrl: './product-my-suffix-delete-dialog.component.html'
})
export class ProductMySuffixDeleteDialogComponent {

    product: ProductMySuffix;

    constructor(
        private productService: ProductMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.productService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'productListModification',
                content: 'Deleted an product'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-product-my-suffix-delete-popup',
    template: ''
})
export class ProductMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private productPopupService: ProductMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.productPopupService
                .open(ProductMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
