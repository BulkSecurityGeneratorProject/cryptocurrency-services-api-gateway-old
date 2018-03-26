import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MasternodesOnlineSupplementPublic } from './masternodes-online-supplement-public.model';
import { MasternodesOnlineSupplementPublicPopupService } from './masternodes-online-supplement-public-popup.service';
import { MasternodesOnlineSupplementPublicService } from './masternodes-online-supplement-public.service';

@Component({
    selector: 'jhi-masternodes-online-supplement-public-dialog',
    templateUrl: './masternodes-online-supplement-public-dialog.component.html'
})
export class MasternodesOnlineSupplementPublicDialogComponent implements OnInit {

    masternodesOnlineSupplementPublic: MasternodesOnlineSupplementPublic;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private masternodesOnlineSupplementPublicService: MasternodesOnlineSupplementPublicService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.masternodesOnlineSupplementPublic.id !== undefined) {
            this.subscribeToSaveResponse(
                this.masternodesOnlineSupplementPublicService.update(this.masternodesOnlineSupplementPublic));
        } else {
            this.subscribeToSaveResponse(
                this.masternodesOnlineSupplementPublicService.create(this.masternodesOnlineSupplementPublic));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<MasternodesOnlineSupplementPublic>>) {
        result.subscribe((res: HttpResponse<MasternodesOnlineSupplementPublic>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: MasternodesOnlineSupplementPublic) {
        this.eventManager.broadcast({ name: 'masternodesOnlineSupplementPublicListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-masternodes-online-supplement-public-popup',
    template: ''
})
export class MasternodesOnlineSupplementPublicPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private masternodesOnlineSupplementPublicPopupService: MasternodesOnlineSupplementPublicPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.masternodesOnlineSupplementPublicPopupService
                    .open(MasternodesOnlineSupplementPublicDialogComponent as Component, params['id']);
            } else {
                this.masternodesOnlineSupplementPublicPopupService
                    .open(MasternodesOnlineSupplementPublicDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
