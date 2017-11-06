import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SaleMySuffix } from './sale-my-suffix.model';
import { SaleMySuffixPopupService } from './sale-my-suffix-popup.service';
import { SaleMySuffixService } from './sale-my-suffix.service';

@Component({
    selector: 'jhi-sale-my-suffix-dialog',
    templateUrl: './sale-my-suffix-dialog.component.html'
})
export class SaleMySuffixDialogComponent implements OnInit {

    sale: SaleMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private saleService: SaleMySuffixService,
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
        if (this.sale.id !== undefined) {
            this.subscribeToSaveResponse(
                this.saleService.update(this.sale));
        } else {
            this.subscribeToSaveResponse(
                this.saleService.create(this.sale));
        }
    }

    private subscribeToSaveResponse(result: Observable<SaleMySuffix>) {
        result.subscribe((res: SaleMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: SaleMySuffix) {
        this.eventManager.broadcast({ name: 'saleListModification', content: 'OK'});
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
    selector: 'jhi-sale-my-suffix-popup',
    template: ''
})
export class SaleMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private salePopupService: SaleMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.salePopupService
                    .open(SaleMySuffixDialogComponent as Component, params['id']);
            } else {
                this.salePopupService
                    .open(SaleMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
