import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { SaleMySuffix } from './sale-my-suffix.model';
import { SaleMySuffixService } from './sale-my-suffix.service';

@Component({
    selector: 'jhi-sale-my-suffix-detail',
    templateUrl: './sale-my-suffix-detail.component.html'
})
export class SaleMySuffixDetailComponent implements OnInit, OnDestroy {

    sale: SaleMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private saleService: SaleMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSales();
    }

    load(id) {
        this.saleService.find(id).subscribe((sale) => {
            this.sale = sale;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSales() {
        this.eventSubscriber = this.eventManager.subscribe(
            'saleListModification',
            (response) => this.load(this.sale.id)
        );
    }
}
