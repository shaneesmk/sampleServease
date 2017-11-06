import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PaymentMySuffix } from './payment-my-suffix.model';
import { PaymentMySuffixPopupService } from './payment-my-suffix-popup.service';
import { PaymentMySuffixService } from './payment-my-suffix.service';

@Component({
    selector: 'jhi-payment-my-suffix-delete-dialog',
    templateUrl: './payment-my-suffix-delete-dialog.component.html'
})
export class PaymentMySuffixDeleteDialogComponent {

    payment: PaymentMySuffix;

    constructor(
        private paymentService: PaymentMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.paymentService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'paymentListModification',
                content: 'Deleted an payment'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-payment-my-suffix-delete-popup',
    template: ''
})
export class PaymentMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private paymentPopupService: PaymentMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.paymentPopupService
                .open(PaymentMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
