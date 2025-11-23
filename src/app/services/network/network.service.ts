import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  private getUrl(endpoint: string): string {
    return `${this.baseUrl}${endpoint}`;
  }

  private getHeaders(token?: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {} ),
      Accept: 'application/json'
    });
    
    return headers;
  }

  get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(this.getUrl(endpoint), { params, headers: this.getHeaders(), withCredentials: true });
  }

  post<T>(endpoint: string, body: any, params?: HttpParams): Observable<T> {
    return this.http.post<T>(this.getUrl(endpoint), body, { params, headers: this.getHeaders(), withCredentials: true });
  }

  put<T>(endpoint: string, body: any, params?: HttpParams): Observable<T> {
    return this.http.put<T>(this.getUrl(endpoint), body, { params, headers: this.getHeaders(), withCredentials: true });
  }

  delete<T>(endpoint: string, body: any ,params?: HttpParams): Observable<T> {
    return this.http.delete<T>(this.getUrl(endpoint), { params, headers: this.getHeaders(), body, withCredentials: true});
  }
}
