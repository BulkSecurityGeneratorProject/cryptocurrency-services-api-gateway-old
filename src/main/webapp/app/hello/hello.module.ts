import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CryptocurrencyServicesApiGatewaySharedModule } from '../shared';

import { HELLO_ROUTE, HelloComponent } from './';

@NgModule({
    imports: [
      CryptocurrencyServicesApiGatewaySharedModule,
      RouterModule.forRoot([ HELLO_ROUTE ], { useHash: true })
    ],
    declarations: [
      HelloComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CryptocurrencyServicesApiGatewayAppHelloModule {}
