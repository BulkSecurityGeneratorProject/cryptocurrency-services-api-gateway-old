/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CryptocurrencyServicesApiGatewayTestModule } from '../../../test.module';
import { MasternodesOnlineSupplementPublicComponent } from '../../../../../../main/webapp/app/masternodes-online-supplement-public/masternodes-online-supplement-public.component';
import { MasternodesOnlineSupplementPublicService } from '../../../../../../main/webapp/app/masternodes-online-supplement-public/masternodes-online-supplement-public.service';
import { MasternodesOnlineSupplementPublic } from '../../../../../../main/webapp/app/masternodes-online-supplement-public/masternodes-online-supplement-public.model';

describe('Component Tests', () => {

    describe('MasternodesOnlineSupplementPublic Management Component', () => {
        let comp: MasternodesOnlineSupplementPublicComponent;
        let fixture: ComponentFixture<MasternodesOnlineSupplementPublicComponent>;
        let service: MasternodesOnlineSupplementPublicService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CryptocurrencyServicesApiGatewayTestModule],
                declarations: [MasternodesOnlineSupplementPublicComponent],
                providers: [
                    MasternodesOnlineSupplementPublicService
                ]
            })
            .overrideTemplate(MasternodesOnlineSupplementPublicComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MasternodesOnlineSupplementPublicComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MasternodesOnlineSupplementPublicService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new MasternodesOnlineSupplementPublic('123')],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.masternodesOnlineSupplementPublics[0]).toEqual(jasmine.objectContaining({id: '123'}));
            });
        });
    });

});
