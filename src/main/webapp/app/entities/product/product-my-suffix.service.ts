import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { ProductMySuffix } from './product-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ProductMySuffixService {

    private resourceUrl = SERVER_API_URL + 'api/products';

    constructor(private http: Http) { }

    create(product: ProductMySuffix): Observable<ProductMySuffix> {
        const copy = this.convert(product);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(product: ProductMySuffix): Observable<ProductMySuffix> {
        const copy = this.convert(product);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<ProductMySuffix> {
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
     * Convert a returned JSON object to ProductMySuffix.
     */
    private convertItemFromServer(json: any): ProductMySuffix {
        const entity: ProductMySuffix = Object.assign(new ProductMySuffix(), json);
        return entity;
    }

    /**
     * Convert a ProductMySuffix to a JSON which can be sent to the server.
     */
    private convert(product: ProductMySuffix): ProductMySuffix {
        const copy: ProductMySuffix = Object.assign({}, product);
        return copy;
    }
}
