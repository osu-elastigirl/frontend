import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Input } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpService } from '../http.service';
import { ChartType } from 'angular-google-charts';
import { Stock } from '../stock';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { VisualizationComponent } from '../visualization/visualization.component';
import { OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-results',
  imports: [RouterOutlet, CommonModule, FormsModule, RouterLink, RouterLinkActive, VisualizationComponent],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent implements OnInit, OnDestroy {
  @Input() query: string = "";
  loading = true;
  prompt = "";
  metricNames: string[] = [];
  stocks: Stock[] = [];
  chartType: ChartType = ChartType['ColumnChart'];
  options = {
    "isStacked": "true",
    'legend': { position: 'none' },
  }
  
  loadingDots = '';
  private dotsInterval: any;

  nameMapping: {[key:string]:string} = {
    'company_news': 'Company News',
    'industry': 'Industry',
    'description': 'Description',
    'sector': 'Sector',
    'recommendation_trends': 'Recommendation Trends',
  }

  constructor(private http: HttpService) {}

  ngOnInit(): void {
    this.loading = true;
    this.startLoadingAnimation();
    
    this.http.getStocksFromPrompt(this.query).subscribe((data) => {
      this.stocks = data;
      this.metricNames = Object.keys(this.stocks[0].metrics);
      for(let i = 0; i < this.metricNames.length; i++) {
        if(!(this.metricNames[i] in this.nameMapping)) {
          this.nameMapping[this.metricNames[i]] = this.metricNames[i];
        }
      }
      this.loading = false;
      this.stopLoadingAnimation();
    });
  }
  
  ngOnDestroy(): void {
    this.stopLoadingAnimation();
  }
  
  private startLoadingAnimation(): void {
    let dots = 0;
    this.dotsInterval = setInterval(() => {
      dots = (dots + 1) % 4;
      this.loadingDots = '.'.repeat(dots);
    }, 500);
  }
  
  private stopLoadingAnimation(): void {
    if (this.dotsInterval) {
      clearInterval(this.dotsInterval);
    }
  }
}
