import { Injectable } from '@angular/core';
import { Stock } from './stock';
import { GoogleChartsModule } from 'angular-google-charts';

@Injectable({
  providedIn: 'root'
})
export class HandlersService {
  handlerMapping: {[key:string]:Function} = {
    'value': this.valueHandler,
    'company_news': this.companyNewsHandler,
    'industry': this.stringHandler,
    'description': this.stringHandler,
    'sector': this.stringHandler,
    'recommendation_trends': this.recommendationTrendsHandler,
  }

  constructor() { }

  handle(stock: Stock, metricName: string) {
    if (!(metricName in this.handlerMapping)) {
      return 'No handler yet';
    }
    return this.handlerMapping[metricName](stock, metricName);
  }

  valueHandler(stock: Stock, metricName: string) {
    let value = stock.metrics[metricName];
    return '<div><p>' + value.toString() + '</p></div>';
  }

  stringHandler(stock: Stock, metricName: string) {
    let value = stock.metrics[metricName];
    return '<div><p>' + value + '</p></div>';
  }

  companyNewsHandler(stock: Stock, metricName: string){
    let news = stock.metrics[metricName];
    if(news.length == 0){
      return 'No news available';
    }
    let headlines = Object.values(news['headline']);
    let summaries = Object.values(news['summary']);
    let urls = Object.values(news['url']);
    var ret = '<div class="min-width-40px">';
    for (var i = 0; i < headlines.length; i++) {
      ret += '<a href="' + urls[i] + '">' + headlines[i] + '</a><br>';
    }
    return ret+'<div>';
  }

  recommendationTrendsHandler(stock: Stock, metricName: string){
    let recommendations = stock.metrics[metricName];
    let data: (string | number)[][] = [["Period", "Strong Buy", "Buy", "Hold", "Sell", "Strong Sell"]];
    for(var i=0; i<recommendations.length; i++){
      let recommendation = recommendations[i];
      let period = recommendation['period'];
      let strongBuy = recommendation['strongBuy'];
      let buy = recommendation['buy'];
      let hold = recommendation['hold'];
      let sell = recommendation['sell'];
      let strongSell = recommendation['strongSell'];
      data.push([period, strongBuy, buy, hold, sell, strongSell]);
    }
    console.log( '<google-chart [type]="SteppedAreaChart" [data]="'+data+'></google-chart>');
    return '<google-chart type="SteppedAreaChart" [data]="' + JSON.stringify(data) + '"></google-chart>';
  }
}
