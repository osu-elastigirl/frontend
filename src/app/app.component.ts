import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpService } from './http.service';
import { FormsModule } from '@angular/forms';
import { StockComponent } from './stock/stock.component';
import { Stock } from './stock';
import * as test_data from "./test_data.json";
import { HandlersService } from './handlers.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule, StockComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  prompt = "";
  stocks: Stock[] = [];
  metricNames: string[] = [];
  handlers = new HandlersService();

  constructor(private http: HttpService) {}

  submit(){
    // this.http.getStocksFromPrompt(this.prompt).subscribe((data) => {
    //   this.stocks = data;
    //   this.metricNames = Object.keys(this.stocks[0].metrics);
    // });
    this.stocks = test_data;
    this.metricNames = Object.keys(this.stocks[0].metrics);

  }

  dataItemHandler(stock:Stock, metric: string){
    if(stock.metrics[metric] instanceof Number){
      return this.handlers.valueHandler(stock, metric);
    }else{
      return 'No handler yet';
    }
  }
}
