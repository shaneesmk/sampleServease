import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ServeaseSharedModule } from '../../shared';
import {
    CartMySuffixService,
    CartMySuffixPopupService,
    CartMySuffixComponent,
    CartMySuffixDetailComponent,
    CartMySuffixDialogComponent,
    CartMySuffixPopupComponent,
    CartMySuffixDeletePopupComponent,
    CartMySuffixDeleteDialogComponent,
    cartRoute,
    cartPopupRoute,
    CartMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...cartRoute,
    ...cartPopupRoute,
];

@NgModule({
    imports: [
        ServeaseSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CartMySuffixComponent,
        CartMySuffixDetailComponent,
        CartMySuffixDialogComponent,
        CartMySuffixDeleteDialogComponent,
        CartMySuffixPopupComponent,
        CartMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        CartMySuffixComponent,
        CartMySuffixDialogComponent,
        CartMySuffixPopupComponent,
        CartMySuffixDeleteDialogComponent,
        CartMySuffixDeletePopupComponent,
    ],
    providers: [
        CartMySuffixService,
        CartMySuffixPopupService,
        CartMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ServeaseCartMySuffixModule {}
