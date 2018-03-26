import { Route } from '@angular/router';

import { UserRouteAccessService } from '../shared';
import { MasternodesOnlineSupplementComponent } from './';

export const MASTERNODES_ONLINE_SUPPLEMENT_ROUTE: Route = {
  path: 'masternodes-online-supplement',
  component: MasternodesOnlineSupplementComponent,
  data: {
    authorities: [],
    pageTitle: 'masternodes-online-supplement.title'
  },
  canActivate: [UserRouteAccessService]
};
