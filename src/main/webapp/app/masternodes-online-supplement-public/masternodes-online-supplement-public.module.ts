import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CryptocurrencyServicesApiGatewaySharedModule } from '../shared/index';
import {
    MasternodesOnlineSupplementPublicService,
    MasternodesOnlineSupplementPublicPopupService,
    MasternodesOnlineSupplementPublicComponent,
    MasternodesOnlineSupplementPublicDetailComponent,
    MasternodesOnlineSupplementPublicDialogComponent,
    MasternodesOnlineSupplementPublicPopupComponent,
    MasternodesOnlineSupplementPublicDeletePopupComponent,
    MasternodesOnlineSupplementPublicDeleteDialogComponent,
    masternodesOnlineSupplementPublicRoute,
    masternodesOnlineSupplementPublicPopupRoute,
} from './index';

const ENTITY_STATES = [
    ...masternodesOnlineSupplementPublicRoute,
    ...masternodesOnlineSupplementPublicPopupRoute,
];

@NgModule({
    imports: [
        CryptocurrencyServicesApiGatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MasternodesOnlineSupplementPublicComponent,
        MasternodesOnlineSupplementPublicDetailComponent,
        MasternodesOnlineSupplementPublicDialogComponent,
        MasternodesOnlineSupplementPublicDeleteDialogComponent,
        MasternodesOnlineSupplementPublicPopupComponent,
        MasternodesOnlineSupplementPublicDeletePopupComponent,
    ],
    entryComponents: [
        MasternodesOnlineSupplementPublicComponent,
        MasternodesOnlineSupplementPublicDialogComponent,
        MasternodesOnlineSupplementPublicPopupComponent,
        MasternodesOnlineSupplementPublicDeleteDialogComponent,
        MasternodesOnlineSupplementPublicDeletePopupComponent,
    ],
    providers: [
        MasternodesOnlineSupplementPublicService,
        MasternodesOnlineSupplementPublicPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CryptocurrencyServicesApiGatewayMasternodesOnlineSupplementPublicModule {}
