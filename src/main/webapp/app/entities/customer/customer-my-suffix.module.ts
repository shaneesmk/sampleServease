import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ServeaseSharedModule } from '../../shared';
import {
    CustomerMySuffixService,
    CustomerMySuffixPopupService,
    CustomerMySuffixComponent,
    CustomerMySuffixDetailComponent,
    CustomerMySuffixDialogComponent,
    CustomerMySuffixPopupComponent,
    CustomerMySuffixDeletePopupComponent,
    CustomerMySuffixDeleteDialogComponent,
    customerRoute,
    customerPopupRoute,
    CustomerMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...customerRoute,
    ...customerPopupRoute,
];

@NgModule({
    imports: [
        ServeaseSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CustomerMySuffixComponent,
        CustomerMySuffixDetailComponent,
        CustomerMySuffixDialogComponent,
        CustomerMySuffixDeleteDialogComponent,
        CustomerMySuffixPopupComponent,
        CustomerMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        CustomerMySuffixComponent,
        CustomerMySuffixDialogComponent,
        CustomerMySuffixPopupComponent,
        CustomerMySuffixDeleteDialogComponent,
        CustomerMySuffixDeletePopupComponent,
    ],
    providers: [
        CustomerMySuffixService,
        CustomerMySuffixPopupService,
        CustomerMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ServeaseCustomerMySuffixModule {}
