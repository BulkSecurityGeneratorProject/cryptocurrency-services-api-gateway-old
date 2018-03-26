import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MasternodesOnlineSupplement } from './masternodes-online-supplement.model';
import { MasternodesOnlineSupplementPopupService } from './masternodes-online-supplement-popup.service';
import { MasternodesOnlineSupplementService } from './masternodes-online-supplement.service';

@Component({
    selector: 'jhi-masternodes-online-supplement-dialog',
    templateUrl: './masternodes-online-supplement-dialog.component.html'
})
export class MasternodesOnlineSupplementDialogComponent implements OnInit {

    masternodesOnlineSupplement: MasternodesOnlineSupplement;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private masternodesOnlineSupplementService: MasternodesOnlineSupplementService,
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
        if (this.masternodesOnlineSupplement.id !== undefined) {
            this.subscribeToSaveResponse(
                this.masternodesOnlineSupplementService.update(this.masternodesOnlineSupplement));
        } else {
            this.subscribeToSaveResponse(
                this.masternodesOnlineSupplementService.create(this.masternodesOnlineSupplement));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<MasternodesOnlineSupplement>>) {
        result.subscribe((res: HttpResponse<MasternodesOnlineSupplement>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: MasternodesOnlineSupplement) {
        this.eventManager.broadcast({ name: 'masternodesOnlineSupplementListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-masternodes-online-supplement-popup',
    template: ''
})
export class MasternodesOnlineSupplementPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private masternodesOnlineSupplementPopupService: MasternodesOnlineSupplementPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.masternodesOnlineSupplementPopupService
                    .open(MasternodesOnlineSupplementDialogComponent as Component, params['id']);
            } else {
                this.masternodesOnlineSupplementPopupService
                    .open(MasternodesOnlineSupplementDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
