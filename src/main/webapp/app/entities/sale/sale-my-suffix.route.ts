import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { SaleMySuffixComponent } from './sale-my-suffix.component';
import { SaleMySuffixDetailComponent } from './sale-my-suffix-detail.component';
import { SaleMySuffixPopupComponent } from './sale-my-suffix-dialog.component';
import { SaleMySuffixDeletePopupComponent } from './sale-my-suffix-delete-dialog.component';

@Injectable()
export class SaleMySuffixResolvePagingParams implements Resolve<any> {

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

export const saleRoute: Routes = [
    {
        path: 'sale-my-suffix',
        component: SaleMySuffixComponent,
        resolve: {
            'pagingParams': SaleMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'serveaseApp.sale.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'sale-my-suffix/:id',
        component: SaleMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'serveaseApp.sale.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const salePopupRoute: Routes = [
    {
        path: 'sale-my-suffix-new',
        component: SaleMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'serveaseApp.sale.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'sale-my-suffix/:id/edit',
        component: SaleMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'serveaseApp.sale.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'sale-my-suffix/:id/delete',
        component: SaleMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'serveaseApp.sale.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
