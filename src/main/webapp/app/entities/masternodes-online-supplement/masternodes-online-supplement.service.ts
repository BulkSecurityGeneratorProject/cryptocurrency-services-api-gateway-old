import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { MasternodesOnlineSupplement } from './masternodes-online-supplement.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<MasternodesOnlineSupplement>;

@Injectable()
export class MasternodesOnlineSupplementService {

    private resourceUrl =  SERVER_API_URL + 'masternodesonlinesupplementapi/api/masternodes-online-supplements';
    private resourceSearchUrl = SERVER_API_URL + 'masternodesonlinesupplementapi/api/_search/masternodes-online-supplements';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(masternodesOnlineSupplement: MasternodesOnlineSupplement): Observable<EntityResponseType> {
        const copy = this.convert(masternodesOnlineSupplement);
        return this.http.post<MasternodesOnlineSupplement>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(masternodesOnlineSupplement: MasternodesOnlineSupplement): Observable<EntityResponseType> {
        const copy = this.convert(masternodesOnlineSupplement);
        return this.http.put<MasternodesOnlineSupplement>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<MasternodesOnlineSupplement>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<MasternodesOnlineSupplement[]>> {
        const options = createRequestOption(req);
        return this.http.get<MasternodesOnlineSupplement[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<MasternodesOnlineSupplement[]>) => this.convertArrayResponse(res));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<MasternodesOnlineSupplement[]>> {
        const options = createRequestOption(req);
        return this.http.get<MasternodesOnlineSupplement[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<MasternodesOnlineSupplement[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: MasternodesOnlineSupplement = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<MasternodesOnlineSupplement[]>): HttpResponse<MasternodesOnlineSupplement[]> {
        const jsonResponse: MasternodesOnlineSupplement[] = res.body;
        const body: MasternodesOnlineSupplement[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to MasternodesOnlineSupplement.
     */
    private convertItemFromServer(masternodesOnlineSupplement: MasternodesOnlineSupplement): MasternodesOnlineSupplement {
        const copy: MasternodesOnlineSupplement = Object.assign({}, masternodesOnlineSupplement);
        copy.githubFirstCommit = this.dateUtils
            .convertDateTimeFromServer(masternodesOnlineSupplement.githubFirstCommit);
        copy.githubLastCommit = this.dateUtils
            .convertDateTimeFromServer(masternodesOnlineSupplement.githubLastCommit);
        return copy;
    }

    /**
     * Convert a MasternodesOnlineSupplement to a JSON which can be sent to the server.
     */
    private convert(masternodesOnlineSupplement: MasternodesOnlineSupplement): MasternodesOnlineSupplement {
        const copy: MasternodesOnlineSupplement = Object.assign({}, masternodesOnlineSupplement);

        copy.githubFirstCommit = this.dateUtils.toDate(masternodesOnlineSupplement.githubFirstCommit);

        copy.githubLastCommit = this.dateUtils.toDate(masternodesOnlineSupplement.githubLastCommit);
        return copy;
    }
}
