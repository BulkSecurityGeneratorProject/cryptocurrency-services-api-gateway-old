/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { CryptocurrencyServicesApiGatewayTestModule } from '../../../test.module';
import { MasternodesOnlineSupplementPublicDialogComponent } from '../../../../../../main/webapp/app/masternodes-online-supplement-public/masternodes-online-supplement-public-dialog.component';
import { MasternodesOnlineSupplementPublicService } from '../../../../../../main/webapp/app/masternodes-online-supplement-public/masternodes-online-supplement-public.service';
import { MasternodesOnlineSupplementPublic } from '../../../../../../main/webapp/app/masternodes-online-supplement-public/masternodes-online-supplement-public.model';

describe('Component Tests', () => {

    describe('MasternodesOnlineSupplementPublic Management Dialog Component', () => {
        let comp: MasternodesOnlineSupplementPublicDialogComponent;
        let fixture: ComponentFixture<MasternodesOnlineSupplementPublicDialogComponent>;
        let service: MasternodesOnlineSupplementPublicService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CryptocurrencyServicesApiGatewayTestModule],
                declarations: [MasternodesOnlineSupplementPublicDialogComponent],
                providers: [
                    MasternodesOnlineSupplementPublicService
                ]
            })
            .overrideTemplate(MasternodesOnlineSupplementPublicDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MasternodesOnlineSupplementPublicDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MasternodesOnlineSupplementPublicService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new MasternodesOnlineSupplementPublic('123');
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.masternodesOnlineSupplementPublic = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'masternodesOnlineSupplementPublicListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new MasternodesOnlineSupplementPublic();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.masternodesOnlineSupplementPublic = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'masternodesOnlineSupplementPublicListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
