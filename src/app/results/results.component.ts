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
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-results',
  imports: [RouterOutlet, CommonModule, FormsModule, RouterLink, RouterLinkActive, VisualizationComponent],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent implements OnInit {
  @Input() query: string = "";
  loading = true;
  prompt = "";
  metricNames: string[] = [];
  stocks: Stock[] = [];
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

  ngOnInit(): void {
    this.loading = true;
    this.http.getStocksFromPrompt(this.query).subscribe((data) => {
      this.stocks = data;
      this.metricNames = Object.keys(this.stocks[0].metrics);
      for(let i = 0; i < this.metricNames.length; i++){
        if(!(this.metricNames[i] in this.nameMapping)){
          this.nameMapping[this.metricNames[i]] = this.metricNames[i];
        }
      }
      this.loading = false;

    });
  }
}
