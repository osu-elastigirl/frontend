import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpService } from './http.service';
import { FormsModule, NgForm } from '@angular/forms';
import { StockComponent } from './stock/stock.component';
import { Stock } from './stock';
import { test_data } from '../assets/test_data.json';
import { HandlersService } from './handlers.service';
import { GoogleChartsModule, ChartType } from 'angular-google-charts';
import { VisualizationComponent } from './visualization/visualization.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule, GoogleChartsModule, VisualizationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  prompt = "";
  stocks: Stock[] = [];
  metricNames: string[] = [];
  handlers = new HandlersService();
  loading = false;
  testChartData = this.recommendationData(test_data[0], 'recommendation_trends');
  chartType: ChartType = ChartType['ColumnChart'];
  options ={
    "isStacked": "true",
    'legend': { position: 'none' },
  }

  nameMapping: {[key:string]:string} = {
    'company_news': 'Company News',
    'industry': 'Industry',
    'description': 'Description',
    'sector': 'Sector',
    'recommendation_trends': 'Recommendation Trends',
  }

  constructor(private http: HttpService) {}

  recommendationData(stock: Stock, metricName: string){
    let recommendations = stock.metrics[metricName];
    // let data: (string | number)[][] = [["Period", "Strong Buy", "Buy", "Hold", "Sell", "Strong Sell"]];
    let data: (string | number)[][] = [];
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
    // data = data[0].map((_, colIndex) => data.map(row => row[colIndex]));
    console.log(data);
    return data;
  }

  submit(promptForm: NgForm){
    this.loading = true;
    this.http.getStocksFromPrompt(this.prompt).subscribe((data) => {
      this.stocks = data;
      this.metricNames = Object.keys(this.stocks[0].metrics);
      for(let i = 0; i < this.metricNames.length; i++){
        if(!(this.metricNames[i] in this.nameMapping)){
          this.nameMapping[this.metricNames[i]] = this.metricNames[i];
        }
      }
      this.loading = false;
    });
    promptForm.reset();
    // this.stocks = test_data;
    // console.log(this.stocks);
    // this.metricNames = Object.keys(this.stocks[0].metrics);

  }

  dataItemHandler(stock:Stock, metric: string){
    return this.handlers.handle(stock, metric);
  }
}
