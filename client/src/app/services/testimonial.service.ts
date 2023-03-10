import { inject, Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY, Observable } from "rxjs";
import { CONFIG } from "../../main";

export interface Testimonial {
    id: number;
    product_id: number;
    reviewer_name: string;
    reviewer_location: string;
    rating: number;
    summary: string;
    description: string;
}

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {
  httpClient = inject(HttpClient);
  config = inject(CONFIG);

  getProductTestimonials(productId: number): Observable<Testimonial[]> {
    const { API_URL } = this.config;

    return this.httpClient.get<Testimonial[]>(`${API_URL}/testimonials/?product_id=${productId}`).pipe(
        catchError((error) => {
            console.error(error);
            return EMPTY;
        })
    );
  }
}