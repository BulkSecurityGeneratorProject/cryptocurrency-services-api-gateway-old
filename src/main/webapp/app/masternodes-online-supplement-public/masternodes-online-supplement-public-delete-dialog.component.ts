import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MasternodesOnlineSupplementPublic } from './masternodes-online-supplement-public.model';
import { MasternodesOnlineSupplementPublicPopupService } from './masternodes-online-supplement-public-popup.service';
import { MasternodesOnlineSupplementPublicService } from './masternodes-online-supplement-public.service';

@Component({
    selector: 'jhi-masternodes-online-supplement-public-delete-dialog',
    templateUrl: './masternodes-online-supplement-public-delete-dialog.component.html'
})
export class MasternodesOnlineSupplementPublicDeleteDialogComponent {

    masternodesOnlineSupplementPublic: MasternodesOnlineSupplementPublic;

    constructor(
        private masternodesOnlineSupplementPublicService: MasternodesOnlineSupplementPublicService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.masternodesOnlineSupplementPublicService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'masternodesOnlineSupplementPublicListModification',
                content: 'Deleted an masternodesOnlineSupplementPublic'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-masternodes-online-supplement-public-delete-popup',
    template: ''
})
export class MasternodesOnlineSupplementPublicDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private masternodesOnlineSupplementPublicPopupService: MasternodesOnlineSupplementPublicPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.masternodesOnlineSupplementPublicPopupService
                .open(MasternodesOnlineSupplementPublicDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
