/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { CryptocurrencyServicesApiGatewayTestModule } from '../../../test.module';
import { MasternodesOnlineSupplementDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/masternodes-online-supplement/masternodes-online-supplement-delete-dialog.component';
import { MasternodesOnlineSupplementService } from '../../../../../../main/webapp/app/entities/masternodes-online-supplement/masternodes-online-supplement.service';

describe('Component Tests', () => {

    describe('MasternodesOnlineSupplement Management Delete Component', () => {
        let comp: MasternodesOnlineSupplementDeleteDialogComponent;
        let fixture: ComponentFixture<MasternodesOnlineSupplementDeleteDialogComponent>;
        let service: MasternodesOnlineSupplementService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CryptocurrencyServicesApiGatewayTestModule],
                declarations: [MasternodesOnlineSupplementDeleteDialogComponent],
                providers: [
                    MasternodesOnlineSupplementService
                ]
            })
            .overrideTemplate(MasternodesOnlineSupplementDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MasternodesOnlineSupplementDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MasternodesOnlineSupplementService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete('123');
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith('123');
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
