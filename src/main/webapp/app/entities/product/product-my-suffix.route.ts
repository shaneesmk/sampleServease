import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ProductMySuffixComponent } from './product-my-suffix.component';
import { ProductMySuffixDetailComponent } from './product-my-suffix-detail.component';
import { ProductMySuffixPopupComponent } from './product-my-suffix-dialog.component';
import { ProductMySuffixDeletePopupComponent } from './product-my-suffix-delete-dialog.component';

@Injectable()
export class ProductMySuffixResolvePagingParams implements Resolve<any> {

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

export const productRoute: Routes = [
    {
        path: 'product-my-suffix',
        component: ProductMySuffixComponent,
        resolve: {
            'pagingParams': ProductMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'serveaseApp.product.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'product-my-suffix/:id',
        component: ProductMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'serveaseApp.product.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const productPopupRoute: Routes = [
    {
        path: 'product-my-suffix-new',
        component: ProductMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'serveaseApp.product.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'product-my-suffix/:id/edit',
        component: ProductMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'serveaseApp.product.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'product-my-suffix/:id/delete',
        component: ProductMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'serveaseApp.product.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
