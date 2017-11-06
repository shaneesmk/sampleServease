import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { CustomerMySuffix } from './customer-my-suffix.model';
import { CustomerMySuffixPopupService } from './customer-my-suffix-popup.service';
import { CustomerMySuffixService } from './customer-my-suffix.service';

@Component({
    selector: 'jhi-customer-my-suffix-dialog',
    templateUrl: './customer-my-suffix-dialog.component.html'
})
export class CustomerMySuffixDialogComponent implements OnInit {

    customer: CustomerMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private customerService: CustomerMySuffixService,
        private elementRef: ElementRef,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.customer, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.customer.id !== undefined) {
            this.subscribeToSaveResponse(
                this.customerService.update(this.customer));
        } else {
            this.subscribeToSaveResponse(
                this.customerService.create(this.customer));
        }
    }

    private subscribeToSaveResponse(result: Observable<CustomerMySuffix>) {
        result.subscribe((res: CustomerMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: CustomerMySuffix) {
        this.eventManager.broadcast({ name: 'customerListModification', content: 'OK'});
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
    selector: 'jhi-customer-my-suffix-popup',
    template: ''
})
export class CustomerMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private customerPopupService: CustomerMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.customerPopupService
                    .open(CustomerMySuffixDialogComponent as Component, params['id']);
            } else {
                this.customerPopupService
                    .open(CustomerMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
