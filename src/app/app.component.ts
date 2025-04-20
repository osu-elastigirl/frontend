import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpService } from './http.service';
import { StockComponent } from './stock/stock.component';
import { Stock } from './stock';
import { test_data } from '../assets/test_data.json';
import { HandlersService } from './handlers.service';
import { GoogleChartsModule, ChartType } from 'angular-google-charts';
import { VisualizationComponent } from './visualization/visualization.component';
import { ResultsComponent } from './results/results.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TickerTapeComponent } from './ticker-tape/ticker-tape.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule,
    FormsModule,
    GoogleChartsModule,
    VisualizationComponent,
    ResultsComponent,
    TickerTapeComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  prompt = "";
  stocks: Stock[] = [];
  metricNames: string[] = [];
  handlers = new HandlersService();
  loading = false;
  chartType: ChartType = ChartType['ColumnChart'];
  options ={
    "isStacked": "true",
    'legend': { position: 'none' },
  }
  atHome: boolean = true;

  nameMapping: {[key:string]:string} = {
    'company_news': 'Company News',
    'industry': 'Industry',
    'description': 'Description',
    'sector': 'Sector',
    'recommendation_trends': 'Recommendation Trends',
  }

  constructor(private http: HttpService, private route: ActivatedRoute, private router: Router) {
    router.events.subscribe((val) => {
      this.atHome = this.router.url === '/';
    });
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

  }

  dataItemHandler(stock:Stock, metric: string){
    return this.handlers.handle(stock, metric);
  }
}
