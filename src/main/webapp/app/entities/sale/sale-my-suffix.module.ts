import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ServeaseSharedModule } from '../../shared';
import {
    SaleMySuffixService,
    SaleMySuffixPopupService,
    SaleMySuffixComponent,
    SaleMySuffixDetailComponent,
    SaleMySuffixDialogComponent,
    SaleMySuffixPopupComponent,
    SaleMySuffixDeletePopupComponent,
    SaleMySuffixDeleteDialogComponent,
    saleRoute,
    salePopupRoute,
    SaleMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...saleRoute,
    ...salePopupRoute,
];

@NgModule({
    imports: [
        ServeaseSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        SaleMySuffixComponent,
        SaleMySuffixDetailComponent,
        SaleMySuffixDialogComponent,
        SaleMySuffixDeleteDialogComponent,
        SaleMySuffixPopupComponent,
        SaleMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        SaleMySuffixComponent,
        SaleMySuffixDialogComponent,
        SaleMySuffixPopupComponent,
        SaleMySuffixDeleteDialogComponent,
        SaleMySuffixDeletePopupComponent,
    ],
    providers: [
        SaleMySuffixService,
        SaleMySuffixPopupService,
        SaleMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ServeaseSaleMySuffixModule {}
