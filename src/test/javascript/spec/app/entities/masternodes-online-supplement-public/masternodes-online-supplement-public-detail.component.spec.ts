/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CryptocurrencyServicesApiGatewayTestModule } from '../../../test.module';
import { MasternodesOnlineSupplementPublicDetailComponent } from '../../../../../../main/webapp/app/masternodes-online-supplement-public/masternodes-online-supplement-public-detail.component';
import { MasternodesOnlineSupplementPublicService } from '../../../../../../main/webapp/app/masternodes-online-supplement-public/masternodes-online-supplement-public.service';
import { MasternodesOnlineSupplementPublic } from '../../../../../../main/webapp/app/masternodes-online-supplement-public/masternodes-online-supplement-public.model';

describe('Component Tests', () => {

    describe('MasternodesOnlineSupplementPublic Management Detail Component', () => {
        let comp: MasternodesOnlineSupplementPublicDetailComponent;
        let fixture: ComponentFixture<MasternodesOnlineSupplementPublicDetailComponent>;
        let service: MasternodesOnlineSupplementPublicService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CryptocurrencyServicesApiGatewayTestModule],
                declarations: [MasternodesOnlineSupplementPublicDetailComponent],
                providers: [
                    MasternodesOnlineSupplementPublicService
                ]
            })
            .overrideTemplate(MasternodesOnlineSupplementPublicDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MasternodesOnlineSupplementPublicDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MasternodesOnlineSupplementPublicService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new MasternodesOnlineSupplementPublic('123')
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith('123');
                expect(comp.masternodesOnlineSupplementPublic).toEqual(jasmine.objectContaining({id: '123'}));
            });
        });
    });

});
