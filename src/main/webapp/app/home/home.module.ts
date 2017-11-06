import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ServeaseSharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent } from './';
import { HomeService } from './home.service';

@NgModule({
    imports: [
        ServeaseSharedModule,
        RouterModule.forRoot([ HOME_ROUTE ], { useHash: true })
    ],
    declarations: [
        HomeComponent,
    ],
    entryComponents: [
    ],
    providers: [
        HomeService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ServeaseHomeModule {}
