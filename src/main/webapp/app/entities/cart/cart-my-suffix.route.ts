import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CartMySuffixComponent } from './cart-my-suffix.component';
import { CartMySuffixDetailComponent } from './cart-my-suffix-detail.component';
import { CartMySuffixPopupComponent } from './cart-my-suffix-dialog.component';
import { CartMySuffixDeletePopupComponent } from './cart-my-suffix-delete-dialog.component';

@Injectable()
export class CartMySuffixResolvePagingParams implements Resolve<any> {

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

export const cartRoute: Routes = [
    {
        path: 'cart-my-suffix',
        component: CartMySuffixComponent,
        resolve: {
            'pagingParams': CartMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'serveaseApp.cart.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cart-my-suffix/:id',
        component: CartMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'serveaseApp.cart.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cartPopupRoute: Routes = [
    {
        path: 'cart-my-suffix-new',
        component: CartMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'serveaseApp.cart.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cart-my-suffix/:id/edit',
        component: CartMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'serveaseApp.cart.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cart-my-suffix/:id/delete',
        component: CartMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'serveaseApp.cart.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
