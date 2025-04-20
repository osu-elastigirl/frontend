// home.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpService } from '../http.service';
import { Stock } from '../stock';

@Component({
  standalone: true,              // <- so we can import modules directly
  selector: 'app-home',
  imports: [CommonModule, FormsModule, RouterLink, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']  // <- plural
})
export class HomeComponent {
  @Input() query = '';
  loading = false;
  prompt = '';
  metricNames: string[] = [];
  stocks: Stock[] = [];
  showGraph = true;          

  nameMapping: { [key: string]: string } = {
    company_news: 'Company News',
    industry: 'Industry',
    description: 'Description',
    sector: 'Sector',
    recommendation_trends: 'Recommendation Trends',
  };

  constructor(private http: HttpService) {}

  submit(form: NgForm) {
    if (!this.prompt.trim()) return;
    this.loading = true;
    this.showGraph = false;
    this.http.getStocksFromPrompt(this.prompt).subscribe(data => {
      this.stocks = data;
      this.metricNames = Object.keys(data[0]?.metrics || {});
      this.metricNames.forEach(m => {
        if (!(m in this.nameMapping)) this.nameMapping[m] = m;
      });
      this.loading = false;
  
    });
  }
}
