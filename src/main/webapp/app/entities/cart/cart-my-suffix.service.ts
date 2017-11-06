import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { CartMySuffix } from './cart-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CartMySuffixService {

    private resourceUrl = SERVER_API_URL + 'api/carts';

    constructor(private http: Http) { }

    create(cart: CartMySuffix): Observable<CartMySuffix> {
        const copy = this.convert(cart);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(cart: CartMySuffix): Observable<CartMySuffix> {
        const copy = this.convert(cart);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<CartMySuffix> {
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
     * Convert a returned JSON object to CartMySuffix.
     */
    private convertItemFromServer(json: any): CartMySuffix {
        const entity: CartMySuffix = Object.assign(new CartMySuffix(), json);
        return entity;
    }

    /**
     * Convert a CartMySuffix to a JSON which can be sent to the server.
     */
    private convert(cart: CartMySuffix): CartMySuffix {
        const copy: CartMySuffix = Object.assign({}, cart);
        return copy;
    }
}
