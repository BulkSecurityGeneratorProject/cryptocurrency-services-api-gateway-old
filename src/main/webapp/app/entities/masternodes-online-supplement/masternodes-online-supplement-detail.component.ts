import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { MasternodesOnlineSupplement } from './masternodes-online-supplement.model';
import { MasternodesOnlineSupplementService } from './masternodes-online-supplement.service';

@Component({
    selector: 'jhi-masternodes-online-supplement-detail',
    templateUrl: './masternodes-online-supplement-detail.component.html'
})
export class MasternodesOnlineSupplementDetailComponent implements OnInit, OnDestroy {

    masternodesOnlineSupplement: MasternodesOnlineSupplement;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private masternodesOnlineSupplementService: MasternodesOnlineSupplementService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMasternodesOnlineSupplements();
    }

    load(id) {
        this.masternodesOnlineSupplementService.find(id)
            .subscribe((masternodesOnlineSupplementResponse: HttpResponse<MasternodesOnlineSupplement>) => {
                this.masternodesOnlineSupplement = masternodesOnlineSupplementResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMasternodesOnlineSupplements() {
        this.eventSubscriber = this.eventManager.subscribe(
            'masternodesOnlineSupplementListModification',
            (response) => this.load(this.masternodesOnlineSupplement.id)
        );
    }
}
