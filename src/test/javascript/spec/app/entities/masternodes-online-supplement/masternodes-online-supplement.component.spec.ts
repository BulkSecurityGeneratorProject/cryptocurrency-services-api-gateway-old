/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CryptocurrencyServicesApiGatewayTestModule } from '../../../test.module';
import { MasternodesOnlineSupplementComponent } from '../../../../../../main/webapp/app/entities/masternodes-online-supplement/masternodes-online-supplement.component';
import { MasternodesOnlineSupplementService } from '../../../../../../main/webapp/app/entities/masternodes-online-supplement/masternodes-online-supplement.service';
import { MasternodesOnlineSupplement } from '../../../../../../main/webapp/app/entities/masternodes-online-supplement/masternodes-online-supplement.model';

describe('Component Tests', () => {

    describe('MasternodesOnlineSupplement Management Component', () => {
        let comp: MasternodesOnlineSupplementComponent;
        let fixture: ComponentFixture<MasternodesOnlineSupplementComponent>;
        let service: MasternodesOnlineSupplementService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CryptocurrencyServicesApiGatewayTestModule],
                declarations: [MasternodesOnlineSupplementComponent],
                providers: [
                    MasternodesOnlineSupplementService
                ]
            })
            .overrideTemplate(MasternodesOnlineSupplementComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MasternodesOnlineSupplementComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MasternodesOnlineSupplementService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new MasternodesOnlineSupplement('123')],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.masternodesOnlineSupplements[0]).toEqual(jasmine.objectContaining({id: '123'}));
            });
        });
    });

});
