import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpService } from './http.service';
import { FormsModule } from '@angular/forms';
import { StockComponent } from './stock/stock.component';
import { Stock } from './stock';

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

  constructor(private http: HttpService) {}

  submit(){
    console.log(this.prompt);
    this.http.getStocksFromPrompt(this.prompt).subscribe((data) => {
      this.stocks = data;
      this.metricNames = Object.keys(this.stocks[0].metrics);
    });
  }
}
