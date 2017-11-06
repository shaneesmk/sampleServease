import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PaymentMySuffix } from './payment-my-suffix.model';
import { PaymentMySuffixPopupService } from './payment-my-suffix-popup.service';
import { PaymentMySuffixService } from './payment-my-suffix.service';

@Component({
    selector: 'jhi-payment-my-suffix-dialog',
    templateUrl: './payment-my-suffix-dialog.component.html'
})
export class PaymentMySuffixDialogComponent implements OnInit {

    payment: PaymentMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private paymentService: PaymentMySuffixService,
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
        if (this.payment.id !== undefined) {
            this.subscribeToSaveResponse(
                this.paymentService.update(this.payment));
        } else {
            this.subscribeToSaveResponse(
                this.paymentService.create(this.payment));
        }
    }

    private subscribeToSaveResponse(result: Observable<PaymentMySuffix>) {
        result.subscribe((res: PaymentMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: PaymentMySuffix) {
        this.eventManager.broadcast({ name: 'paymentListModification', content: 'OK'});
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
    selector: 'jhi-payment-my-suffix-popup',
    template: ''
})
export class PaymentMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private paymentPopupService: PaymentMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.paymentPopupService
                    .open(PaymentMySuffixDialogComponent as Component, params['id']);
            } else {
                this.paymentPopupService
                    .open(PaymentMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
