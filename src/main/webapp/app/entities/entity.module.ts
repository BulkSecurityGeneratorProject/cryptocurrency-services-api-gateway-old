import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CryptocurrencyServicesApiGatewayTest1Module } from './test-1/test-1.module';
import { CryptocurrencyServicesApiGatewayMasternodesOnlineSupplementModule } from './masternodes-online-supplement/masternodes-online-supplement.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        CryptocurrencyServicesApiGatewayTest1Module,
        CryptocurrencyServicesApiGatewayMasternodesOnlineSupplementModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CryptocurrencyServicesApiGatewayEntityModule {}
