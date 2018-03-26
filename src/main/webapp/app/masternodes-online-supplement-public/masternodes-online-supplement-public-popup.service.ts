import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { MasternodesOnlineSupplementPublic } from './masternodes-online-supplement-public.model';
import { MasternodesOnlineSupplementPublicService } from './masternodes-online-supplement-public.service';

@Injectable()
export class MasternodesOnlineSupplementPublicPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private masternodesOnlineSupplementPublicService: MasternodesOnlineSupplementPublicService

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
                this.masternodesOnlineSupplementPublicService.find(id)
                    .subscribe((masternodesOnlineSupplementPublicResponse: HttpResponse<MasternodesOnlineSupplementPublic>) => {
                        const masternodesOnlineSupplementPublic: MasternodesOnlineSupplementPublic = masternodesOnlineSupplementPublicResponse.body;
                        masternodesOnlineSupplementPublic.githubFirstCommit = this.datePipe
                            .transform(masternodesOnlineSupplementPublic.githubFirstCommit, 'yyyy-MM-ddTHH:mm:ss');
                        masternodesOnlineSupplementPublic.githubLastCommit = this.datePipe
                            .transform(masternodesOnlineSupplementPublic.githubLastCommit, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.masternodesOnlineSupplementPublicModalRef(component, masternodesOnlineSupplementPublic);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.masternodesOnlineSupplementPublicModalRef(component, new MasternodesOnlineSupplementPublic());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    masternodesOnlineSupplementPublicModalRef(component: Component,
        masternodesOnlineSupplementPublic: MasternodesOnlineSupplementPublic): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.masternodesOnlineSupplementPublic = masternodesOnlineSupplementPublic;
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
