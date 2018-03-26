import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { MasternodesOnlineSupplementPublic } from './masternodes-online-supplement-public.model';
import { MasternodesOnlineSupplementPublicService } from './masternodes-online-supplement-public.service';

@Component({
    selector: 'jhi-masternodes-online-supplement-public-detail',
    templateUrl: './masternodes-online-supplement-public-detail.component.html'
})
export class MasternodesOnlineSupplementPublicDetailComponent implements OnInit, OnDestroy {

    masternodesOnlineSupplementPublic: MasternodesOnlineSupplementPublic;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private masternodesOnlineSupplementPublicService: MasternodesOnlineSupplementPublicService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMasternodesOnlineSupplementPublics();
    }

    load(id) {
        this.masternodesOnlineSupplementPublicService.find(id)
            .subscribe((masternodesOnlineSupplementPublicResponse: HttpResponse<MasternodesOnlineSupplementPublic>) => {
                this.masternodesOnlineSupplementPublic = masternodesOnlineSupplementPublicResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMasternodesOnlineSupplementPublics() {
        this.eventSubscriber = this.eventManager.subscribe(
            'masternodesOnlineSupplementPublicListModification',
            (response) => this.load(this.masternodesOnlineSupplementPublic.id)
        );
    }
}
