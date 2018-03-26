import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CryptocurrencyServicesApiGatewaySharedModule } from '../../shared';
import {
    MasternodesOnlineSupplementService,
    MasternodesOnlineSupplementPopupService,
    MasternodesOnlineSupplementComponent,
    MasternodesOnlineSupplementDetailComponent,
    MasternodesOnlineSupplementDialogComponent,
    MasternodesOnlineSupplementPopupComponent,
    MasternodesOnlineSupplementDeletePopupComponent,
    MasternodesOnlineSupplementDeleteDialogComponent,
    masternodesOnlineSupplementRoute,
    masternodesOnlineSupplementPopupRoute,
} from './';

const ENTITY_STATES = [
    ...masternodesOnlineSupplementRoute,
    ...masternodesOnlineSupplementPopupRoute,
];

@NgModule({
    imports: [
        CryptocurrencyServicesApiGatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MasternodesOnlineSupplementComponent,
        MasternodesOnlineSupplementDetailComponent,
        MasternodesOnlineSupplementDialogComponent,
        MasternodesOnlineSupplementDeleteDialogComponent,
        MasternodesOnlineSupplementPopupComponent,
        MasternodesOnlineSupplementDeletePopupComponent,
    ],
    entryComponents: [
        MasternodesOnlineSupplementComponent,
        MasternodesOnlineSupplementDialogComponent,
        MasternodesOnlineSupplementPopupComponent,
        MasternodesOnlineSupplementDeleteDialogComponent,
        MasternodesOnlineSupplementDeletePopupComponent,
    ],
    providers: [
        MasternodesOnlineSupplementService,
        MasternodesOnlineSupplementPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CryptocurrencyServicesApiGatewayMasternodesOnlineSupplementModule {}
