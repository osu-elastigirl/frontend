import { Injectable } from '@angular/core';
import { Stock } from './stock';

@Injectable({
  providedIn: 'root'
})
export class HandlersService {

  constructor() { }

  valueHandler(stock: Stock, metricName: string) {
    let value = stock.metrics[metricName];
    return '<div>' + value.toString() + '</div>';
  }

  companyNewsHandler(stock: Stock, metricName: string){
    let news = stock.metrics[metricName];
    let headlines = news['headline'];
    let summaries = news['summary'];
    let urls = news['url'];
    var ret = '';
    for (var i = 0; i < headlines.length; i++) {
      ret += '<a href="' + urls[i] + '">' + headlines[i] + '</a><br>' + summaries[i] + '<br><br>';
    }
    return ret;
  }
}
