import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { CustomerMySuffix } from './customer-my-suffix.model';
import { CustomerMySuffixService } from './customer-my-suffix.service';

@Component({
    selector: 'jhi-customer-my-suffix-detail',
    templateUrl: './customer-my-suffix-detail.component.html'
})
export class CustomerMySuffixDetailComponent implements OnInit, OnDestroy {

    customer: CustomerMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private customerService: CustomerMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCustomers();
    }

    load(id) {
        this.customerService.find(id).subscribe((customer) => {
            this.customer = customer;
        });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCustomers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'customerListModification',
            (response) => this.load(this.customer.id)
        );
    }
}
