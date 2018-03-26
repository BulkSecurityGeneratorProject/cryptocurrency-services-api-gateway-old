import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MasternodesOnlineSupplement } from './masternodes-online-supplement.model';
import { MasternodesOnlineSupplementPopupService } from './masternodes-online-supplement-popup.service';
import { MasternodesOnlineSupplementService } from './masternodes-online-supplement.service';

@Component({
    selector: 'jhi-masternodes-online-supplement-delete-dialog',
    templateUrl: './masternodes-online-supplement-delete-dialog.component.html'
})
export class MasternodesOnlineSupplementDeleteDialogComponent {

    masternodesOnlineSupplement: MasternodesOnlineSupplement;

    constructor(
        private masternodesOnlineSupplementService: MasternodesOnlineSupplementService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.masternodesOnlineSupplementService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'masternodesOnlineSupplementListModification',
                content: 'Deleted an masternodesOnlineSupplement'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-masternodes-online-supplement-delete-popup',
    template: ''
})
export class MasternodesOnlineSupplementDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private masternodesOnlineSupplementPopupService: MasternodesOnlineSupplementPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.masternodesOnlineSupplementPopupService
                .open(MasternodesOnlineSupplementDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
