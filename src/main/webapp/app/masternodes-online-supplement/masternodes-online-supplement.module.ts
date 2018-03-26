import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CryptocurrencyServicesApiGatewaySharedModule } from '../shared';

import { MASTERNODES_ONLINE_SUPPLEMENT_ROUTE, MasternodesOnlineSupplementComponent } from './';

@NgModule({
    imports: [
      CryptocurrencyServicesApiGatewaySharedModule,
      RouterModule.forRoot([ MASTERNODES_ONLINE_SUPPLEMENT_ROUTE ], { useHash: true })
    ],
    declarations: [
      MasternodesOnlineSupplementComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CryptocurrencyServicesApiGatewayAppMasternodesOnlineSupplementModule {}
