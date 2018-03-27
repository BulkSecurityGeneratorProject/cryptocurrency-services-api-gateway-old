import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../shared/index';
import { MasternodesOnlineSupplementPublicComponent } from './masternodes-online-supplement-public.component';
import { MasternodesOnlineSupplementPublicDetailComponent } from './masternodes-online-supplement-public-detail.component';
import { MasternodesOnlineSupplementPublicPopupComponent } from './masternodes-online-supplement-public-dialog.component';
import {
    MasternodesOnlineSupplementPublicDeletePopupComponent
} from './masternodes-online-supplement-public-delete-dialog.component';

export const masternodesOnlineSupplementPublicRoute: Routes = [
    {
        path: 'masternodes-online-supplement-public',
        component: MasternodesOnlineSupplementPublicComponent,
        data: {
            authorities: [],
            pageTitle: 'MasternodesOnlineSupplementPublics'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'masternodes-online-supplement-public',
        component: MasternodesOnlineSupplementPublicComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MasternodesOnlineSupplementPublics'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'masternodes-online-supplement-public/:id',
        component: MasternodesOnlineSupplementPublicDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MasternodesOnlineSupplementPublics'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const masternodesOnlineSupplementPublicPopupRoute: Routes = [
    {
        path: 'masternodes-online-supplement-public-new',
        component: MasternodesOnlineSupplementPublicPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MasternodesOnlineSupplementPublics'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'masternodes-online-supplement-public/:id/edit',
        component: MasternodesOnlineSupplementPublicPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MasternodesOnlineSupplementPublics'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'masternodes-online-supplement-public/:id/delete',
        component: MasternodesOnlineSupplementPublicDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MasternodesOnlineSupplementPublics'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
