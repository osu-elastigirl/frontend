import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stock } from './stock';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private url = 'http://localhost:5001/';

  constructor(private http: HttpClient) { }

  getStocksFromPrompt(prompt: string) {
    return this.http.post<[Stock]>(this.url + 'description', { description: prompt });
  }
}
