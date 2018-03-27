import { Route } from '@angular/router';

import { UserRouteAccessService } from '../shared';
import { HelloComponent } from './';

export const HELLO_ROUTE: Route = {
  path: 'hello',
  component: HelloComponent,
  data: {
    authorities: [],
    pageTitle: 'hello.title'
  },
  canActivate: [UserRouteAccessService]
};
