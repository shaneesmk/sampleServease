import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PaymentMySuffixComponent } from './payment-my-suffix.component';
import { PaymentMySuffixDetailComponent } from './payment-my-suffix-detail.component';
import { PaymentMySuffixPopupComponent } from './payment-my-suffix-dialog.component';
import { PaymentMySuffixDeletePopupComponent } from './payment-my-suffix-delete-dialog.component';

@Injectable()
export class PaymentMySuffixResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const paymentRoute: Routes = [
    {
        path: 'payment-my-suffix',
        component: PaymentMySuffixComponent,
        resolve: {
            'pagingParams': PaymentMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'serveaseApp.payment.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'payment-my-suffix/:id',
        component: PaymentMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'serveaseApp.payment.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const paymentPopupRoute: Routes = [
    {
        path: 'payment-my-suffix-new',
        component: PaymentMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'serveaseApp.payment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'payment-my-suffix/:id/edit',
        component: PaymentMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'serveaseApp.payment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'payment-my-suffix/:id/delete',
        component: PaymentMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'serveaseApp.payment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
