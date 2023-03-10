import { inject, Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY, Observable } from "rxjs";
import { CONFIG } from "../../main";

export interface ProductItem {
  id: number;
  name: string;
  description: string;
  price: string;
  discount_price: string;
  active: boolean;
  discount_percent: number;
  discount_saving: number,
  inventory_count: number;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  httpClient = inject(HttpClient);
  config = inject(CONFIG);

  buyProduct(productId: number): Observable<ProductItem> {
    const { API_URL } = this.config;

    return this.httpClient.post<ProductItem>(`${API_URL}/products/${productId}/purchase/`, {}).pipe(catchError(error => {
      console.error(error);
      return EMPTY;
    }));
  }

  getProduct(productId: number): Observable<ProductItem> {
    const { API_URL } = this.config;

    return this.httpClient.get<ProductItem>(`${API_URL}/products/${productId}`).pipe(catchError(error => {
      console.error(error);
      return EMPTY;
    }));
  }

  getProductList(): Observable<ProductItem[]> {
    const { API_URL } = this.config;

    return this.httpClient.get<ProductItem[]>(`${API_URL}/products/`).pipe(catchError(error => {
      console.error(error);
      return EMPTY;
    }));
  }

  getActiveProduct(): Observable<ProductItem> {
    const { API_URL } = this.config;

    return this.httpClient.get<ProductItem>(`${API_URL}/active/product/`).pipe(catchError(error => {
      console.error(error);
      return EMPTY;
    }));
  };
}