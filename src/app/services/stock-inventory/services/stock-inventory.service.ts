import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product, Item } from '../models/product.interface';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class StockInventoryService {
  constructor(private http: HttpClient) {}

  getCartItems(): Observable<Item[]> {
    return this.http.get<Item[]>('/api/cart').pipe(
      catchError(err => {
        console.log('caught mapping error and rethrowing', err);
        return throwError(err);
      }),
      catchError(() => {
        console.log('caught rethrown error, providing fallback value');
        return of([]);
      })
    );
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/products').pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
