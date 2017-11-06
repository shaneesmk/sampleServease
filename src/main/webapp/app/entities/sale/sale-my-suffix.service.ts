import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { SaleMySuffix } from './sale-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class SaleMySuffixService {

    private resourceUrl = SERVER_API_URL + 'api/sales';

    constructor(private http: Http) { }

    create(sale: SaleMySuffix): Observable<SaleMySuffix> {
        const copy = this.convert(sale);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(sale: SaleMySuffix): Observable<SaleMySuffix> {
        const copy = this.convert(sale);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<SaleMySuffix> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to SaleMySuffix.
     */
    private convertItemFromServer(json: any): SaleMySuffix {
        const entity: SaleMySuffix = Object.assign(new SaleMySuffix(), json);
        return entity;
    }

    /**
     * Convert a SaleMySuffix to a JSON which can be sent to the server.
     */
    private convert(sale: SaleMySuffix): SaleMySuffix {
        const copy: SaleMySuffix = Object.assign({}, sale);
        return copy;
    }
}
