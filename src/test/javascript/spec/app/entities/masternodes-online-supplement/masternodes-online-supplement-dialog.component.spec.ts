/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { CryptocurrencyServicesApiGatewayTestModule } from '../../../test.module';
import { MasternodesOnlineSupplementDialogComponent } from '../../../../../../main/webapp/app/entities/masternodes-online-supplement/masternodes-online-supplement-dialog.component';
import { MasternodesOnlineSupplementService } from '../../../../../../main/webapp/app/entities/masternodes-online-supplement/masternodes-online-supplement.service';
import { MasternodesOnlineSupplement } from '../../../../../../main/webapp/app/entities/masternodes-online-supplement/masternodes-online-supplement.model';

describe('Component Tests', () => {

    describe('MasternodesOnlineSupplement Management Dialog Component', () => {
        let comp: MasternodesOnlineSupplementDialogComponent;
        let fixture: ComponentFixture<MasternodesOnlineSupplementDialogComponent>;
        let service: MasternodesOnlineSupplementService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CryptocurrencyServicesApiGatewayTestModule],
                declarations: [MasternodesOnlineSupplementDialogComponent],
                providers: [
                    MasternodesOnlineSupplementService
                ]
            })
            .overrideTemplate(MasternodesOnlineSupplementDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MasternodesOnlineSupplementDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MasternodesOnlineSupplementService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new MasternodesOnlineSupplement('123');
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.masternodesOnlineSupplement = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'masternodesOnlineSupplementListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new MasternodesOnlineSupplement();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.masternodesOnlineSupplement = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'masternodesOnlineSupplementListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
