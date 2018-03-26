import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { MasternodesOnlineSupplement } from './masternodes-online-supplement.model';
import { MasternodesOnlineSupplementService } from './masternodes-online-supplement.service';

@Injectable()
export class MasternodesOnlineSupplementPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private masternodesOnlineSupplementService: MasternodesOnlineSupplementService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.masternodesOnlineSupplementService.find(id)
                    .subscribe((masternodesOnlineSupplementResponse: HttpResponse<MasternodesOnlineSupplement>) => {
                        const masternodesOnlineSupplement: MasternodesOnlineSupplement = masternodesOnlineSupplementResponse.body;
                        masternodesOnlineSupplement.githubFirstCommit = this.datePipe
                            .transform(masternodesOnlineSupplement.githubFirstCommit, 'yyyy-MM-ddTHH:mm:ss');
                        masternodesOnlineSupplement.githubLastCommit = this.datePipe
                            .transform(masternodesOnlineSupplement.githubLastCommit, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.masternodesOnlineSupplementModalRef(component, masternodesOnlineSupplement);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.masternodesOnlineSupplementModalRef(component, new MasternodesOnlineSupplement());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    masternodesOnlineSupplementModalRef(component: Component, masternodesOnlineSupplement: MasternodesOnlineSupplement): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.masternodesOnlineSupplement = masternodesOnlineSupplement;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
