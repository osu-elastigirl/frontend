import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Input } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpService } from '../http.service';
import { ChartType } from 'angular-google-charts';
import { Stock } from '../stock';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, RouterLink, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @Input() query: string = "";
  loading = true;
  prompt = "";
  metricNames: string[] = [];
  stocks: Stock[] = [];

    nameMapping: {[key:string]:string} = {
      'company_news': 'Company News',
      'industry': 'Industry',
      'description': 'Description',
      'sector': 'Sector',
      'recommendation_trends': 'Recommendation Trends',
    }

  constructor(private http: HttpService) {}

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
  }

}
