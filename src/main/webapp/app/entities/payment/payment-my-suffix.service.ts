import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { PaymentMySuffix } from './payment-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class PaymentMySuffixService {

    private resourceUrl = SERVER_API_URL + 'api/payments';

    constructor(private http: Http) { }

    create(payment: PaymentMySuffix): Observable<PaymentMySuffix> {
        const copy = this.convert(payment);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(payment: PaymentMySuffix): Observable<PaymentMySuffix> {
        const copy = this.convert(payment);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<PaymentMySuffix> {
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
     * Convert a returned JSON object to PaymentMySuffix.
     */
    private convertItemFromServer(json: any): PaymentMySuffix {
        const entity: PaymentMySuffix = Object.assign(new PaymentMySuffix(), json);
        return entity;
    }

    /**
     * Convert a PaymentMySuffix to a JSON which can be sent to the server.
     */
    private convert(payment: PaymentMySuffix): PaymentMySuffix {
        const copy: PaymentMySuffix = Object.assign({}, payment);
        return copy;
    }
}
