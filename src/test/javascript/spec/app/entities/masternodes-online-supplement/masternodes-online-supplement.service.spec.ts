/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JhiDateUtils } from 'ng-jhipster';

import { MasternodesOnlineSupplementService } from '../../../../../../main/webapp/app/entities/masternodes-online-supplement/masternodes-online-supplement.service';
import { SERVER_API_URL } from '../../../../../../main/webapp/app/app.constants';

describe('Service Tests', () => {

    describe('MasternodesOnlineSupplement Service', () => {
        let injector: TestBed;
        let service: MasternodesOnlineSupplementService;
        let httpMock: HttpTestingController;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [
                    HttpClientTestingModule
                ],
                providers: [
                    JhiDateUtils,
                    MasternodesOnlineSupplementService
                ]
            });
            injector = getTestBed();
            service = injector.get(MasternodesOnlineSupplementService);
            httpMock = injector.get(HttpTestingController);
        });

        describe('Service methods', () => {
            it('should call correct URL', () => {
                service.find('123').subscribe(() => {});

                const req  = httpMock.expectOne({ method: 'GET' });

                // const resourceUrl = SERVER_API_URL + '/masternodesonlinesupplementapi/api/masternodes-online-supplements';
                const resourceUrl = SERVER_API_URL + 'masternodesonlinesupplementapi/api/masternodes-online-supplements';
                expect(req.request.url).toEqual(resourceUrl + '/' + '123');
            });
            it('should return MasternodesOnlineSupplement', () => {

                service.find('123').subscribe((received) => {
                    expect(received.body.id).toEqual('123');
                });

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush({id: '123'});
            });

            it('should propagate not found response', () => {

                service.find('123').subscribe(null, (_error: any) => {
                    expect(_error.status).toEqual(404);
                });

                const req  = httpMock.expectOne({ method: 'GET' });
                req.flush('Invalid request parameters', {
                    status: 404, statusText: 'Bad Request'
                });

            });
        });

        afterEach(() => {
            httpMock.verify();
        });

    });

});
