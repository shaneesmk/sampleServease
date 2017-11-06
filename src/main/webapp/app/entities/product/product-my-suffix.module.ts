import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ServeaseSharedModule } from '../../shared';
import {
    ProductMySuffixService,
    ProductMySuffixPopupService,
    ProductMySuffixComponent,
    ProductMySuffixDetailComponent,
    ProductMySuffixDialogComponent,
    ProductMySuffixPopupComponent,
    ProductMySuffixDeletePopupComponent,
    ProductMySuffixDeleteDialogComponent,
    productRoute,
    productPopupRoute,
    ProductMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...productRoute,
    ...productPopupRoute,
];

@NgModule({
    imports: [
        ServeaseSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ProductMySuffixComponent,
        ProductMySuffixDetailComponent,
        ProductMySuffixDialogComponent,
        ProductMySuffixDeleteDialogComponent,
        ProductMySuffixPopupComponent,
        ProductMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        ProductMySuffixComponent,
        ProductMySuffixDialogComponent,
        ProductMySuffixPopupComponent,
        ProductMySuffixDeleteDialogComponent,
        ProductMySuffixDeletePopupComponent,
    ],
    providers: [
        ProductMySuffixService,
        ProductMySuffixPopupService,
        ProductMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ServeaseProductMySuffixModule {}
