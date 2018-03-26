import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { MasternodesOnlineSupplementComponent } from './masternodes-online-supplement.component';
import { MasternodesOnlineSupplementDetailComponent } from './masternodes-online-supplement-detail.component';
import { MasternodesOnlineSupplementPopupComponent } from './masternodes-online-supplement-dialog.component';
import { MasternodesOnlineSupplementDeletePopupComponent } from './masternodes-online-supplement-delete-dialog.component';

export const masternodesOnlineSupplementRoute: Routes = [
    {
        path: 'masternodes-online-supplement',
        component: MasternodesOnlineSupplementComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MasternodesOnlineSupplements'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'masternodes-online-supplement/:id',
        component: MasternodesOnlineSupplementDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MasternodesOnlineSupplements'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const masternodesOnlineSupplementPopupRoute: Routes = [
    {
        path: 'masternodes-online-supplement-new',
        component: MasternodesOnlineSupplementPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MasternodesOnlineSupplements'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'masternodes-online-supplement/:id/edit',
        component: MasternodesOnlineSupplementPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MasternodesOnlineSupplements'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'masternodes-online-supplement/:id/delete',
        component: MasternodesOnlineSupplementDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MasternodesOnlineSupplements'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
