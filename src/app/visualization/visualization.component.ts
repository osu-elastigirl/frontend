import { Component, Input } from '@angular/core';
import { Stock } from '../stock';
import { CommonModule } from '@angular/common';
import { GoogleChartsModule, ChartType } from 'angular-google-charts';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-visualization',
  imports: [CommonModule, GoogleChartsModule],
  templateUrl: './visualization.component.html',
  styleUrl: './visualization.component.scss'
})
export class VisualizationComponent implements OnInit {
  @Input() stock!: Stock;
  @Input() metricName!: string;
  chartType: ChartType = ChartType['LineChart'];
  data: any;

  ngOnInit(): void {
    if(this.metricName == 'recommendation_trends'){
      this.data = this.recommendationData();
    }
  }

  options ={
    'isStacked': 'true',
    'legend': {
      'textStyle': {
        'color': 'white',
      }
    },
    'chartArea': {'left': 5, 'right': 5},
    'fontSize': 8,
    series: [
      {color: '#F44336'},
      {color: '#FF9800'},
      {color: '#FFEB3B'},
      {color: '#8BC34A'},
      {color: '#4CAF50'},
    ],
    'hAxis': {
      'gridlines': {
        'minSpacing': 5,
      },
      'textStyle': {
        'fontSize': 8,
        'color': 'white'
      },
      'direction': -1,
      'textPosition': 'none',
    },
    'backgroundColor':{
      'fill': 'transparent',
    },
    'tooltip':{
      'isHtml': true,
      'ignoreBounds': true,
      'trigger': 'none',
    },
    'bar':{
      'groupWidth': '10',
    },
  }
  columns = ['Period', 'Strong Sell', 'Sell', 'Hold', 'Buy', 'Strong Buy'];
  knownMetrics: string[] = ['value', 'company_news', 'industry', 'description', 'sector', 'recommendation_trends'];

  values(object: Object){
    return Object.values(object);
  }

  logThis(){
    console.log(this.stock);
    console.log(this.metricName);
    console.log(this.stock.metrics[this.metricName]);
  }

  recommendationData(){
    console.log(this.stock);
    let recommendations = this.stock.metrics[this.metricName];
    let data: (string | number)[][] = [];
    for(var i=0; i<recommendations.length; i++){
      let recommendation = recommendations[i];
      let period = recommendation['period'];
      let strongBuy = recommendation['strongBuy'];
      let buy = recommendation['buy'];
      let hold = recommendation['hold'];
      let sell = recommendation['sell'];
      let strongSell = recommendation['strongSell'];
      data.push([period, strongSell, sell, hold, buy, strongBuy]);
    }
    console.log(data);
    return data;
  }

}
