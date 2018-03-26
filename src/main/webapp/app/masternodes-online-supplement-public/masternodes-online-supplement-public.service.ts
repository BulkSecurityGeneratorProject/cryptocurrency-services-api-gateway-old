import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { MasternodesOnlineSupplementPublic } from './masternodes-online-supplement-public.model';
import { createRequestOption } from '../shared/index';

export type EntityResponseType = HttpResponse<MasternodesOnlineSupplementPublic>;

@Injectable()
export class MasternodesOnlineSupplementPublicService {

    private resourceUrl =  SERVER_API_URL + 'masternodesonlinesupplementapi/api/public/masternodes-online-supplements';
    private resourceSearchUrl = SERVER_API_URL + 'masternodesonlinesupplementapi/api/public/_search/masternodes-online-supplements';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(masternodesOnlineSupplementPublic: MasternodesOnlineSupplementPublic):
        Observable<EntityResponseType> {
        const copy = this.convert(masternodesOnlineSupplementPublic);
        return this.http.post<MasternodesOnlineSupplementPublic>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(masternodesOnlineSupplementPublic: MasternodesOnlineSupplementPublic):
        Observable<EntityResponseType> {
        const copy = this.convert(masternodesOnlineSupplementPublic);
        return this.http.put<MasternodesOnlineSupplementPublic>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<MasternodesOnlineSupplementPublic>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<MasternodesOnlineSupplementPublic[]>> {
        const options = createRequestOption(req);
        return this.http.get<MasternodesOnlineSupplementPublic[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<MasternodesOnlineSupplementPublic[]>) => this.convertArrayResponse(res));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<MasternodesOnlineSupplementPublic[]>> {
        const options = createRequestOption(req);
        return this.http.get<MasternodesOnlineSupplementPublic[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<MasternodesOnlineSupplementPublic[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: MasternodesOnlineSupplementPublic = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<MasternodesOnlineSupplementPublic[]>): HttpResponse<MasternodesOnlineSupplementPublic[]> {
        const jsonResponse: MasternodesOnlineSupplementPublic[] = res.body;
        const body: MasternodesOnlineSupplementPublic[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to MasternodesOnlineSupplementPublic.
     */
    private convertItemFromServer(masternodesOnlineSupplementPublic: MasternodesOnlineSupplementPublic): MasternodesOnlineSupplementPublic {
        const copy: MasternodesOnlineSupplementPublic = Object.assign({}, masternodesOnlineSupplementPublic);
        copy.githubFirstCommit = this.dateUtils
            .convertDateTimeFromServer(masternodesOnlineSupplementPublic.githubFirstCommit);
        copy.githubLastCommit = this.dateUtils
            .convertDateTimeFromServer(masternodesOnlineSupplementPublic.githubLastCommit);
        return copy;
    }

    /**
     * Convert a MasternodesOnlineSupplementPublic to a JSON which can be sent to the server.
     */
    private convert(masternodesOnlineSupplementPublic: MasternodesOnlineSupplementPublic): MasternodesOnlineSupplementPublic {
        const copy: MasternodesOnlineSupplementPublic = Object.assign({}, masternodesOnlineSupplementPublic);

        copy.githubFirstCommit = this.dateUtils.toDate(masternodesOnlineSupplementPublic.githubFirstCommit);

        copy.githubLastCommit = this.dateUtils.toDate(masternodesOnlineSupplementPublic.githubLastCommit);
        return copy;
    }
}
