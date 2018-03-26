/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { CryptocurrencyServicesApiGatewayTestModule } from '../../../test.module';
import { MasternodesOnlineSupplementPublicDeleteDialogComponent } from '../../../../../../main/webapp/app/masternodes-online-supplement-public/masternodes-online-supplement-public-delete-dialog.component';
import { MasternodesOnlineSupplementPublicService } from '../../../../../../main/webapp/app/masternodes-online-supplement-public/masternodes-online-supplement-public.service';

describe('Component Tests', () => {

    describe('MasternodesOnlineSupplementPublic Management Delete Component', () => {
        let comp: MasternodesOnlineSupplementPublicDeleteDialogComponent;
        let fixture: ComponentFixture<MasternodesOnlineSupplementPublicDeleteDialogComponent>;
        let service: MasternodesOnlineSupplementPublicService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CryptocurrencyServicesApiGatewayTestModule],
                declarations: [MasternodesOnlineSupplementPublicDeleteDialogComponent],
                providers: [
                    MasternodesOnlineSupplementPublicService
                ]
            })
            .overrideTemplate(MasternodesOnlineSupplementPublicDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MasternodesOnlineSupplementPublicDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MasternodesOnlineSupplementPublicService);
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
