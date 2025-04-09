import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TickerData {
  symbol: string;
  changePercent: number;
}

@Component({
  selector: 'app-ticker-tape',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ticker-container">
      <div class="ticker-wrap">
        <div class="ticker-move">
          <!-- First set of ticker data -->
          <ng-container *ngFor="let item of tickerData">
            <div class="ticker-item">
              <span class="symbol">{{item.symbol}}</span>
              <span [class.positive]="item.changePercent >= 0" [class.negative]="item.changePercent < 0">
                {{formatChangePercent(item.changePercent)}}
              </span>
            </div>
          </ng-container>
          <!-- Duplicate for continuous scrolling -->
          <ng-container *ngFor="let item of tickerData">
            <div class="ticker-item">
              <span class="symbol">{{item.symbol}}</span>
              <span [class.positive]="item.changePercent >= 0" [class.negative]="item.changePercent < 0">
                {{formatChangePercent(item.changePercent)}}
              </span>
            </div>
          </ng-container>
          <!-- Triplicate for better coverage -->
          <ng-container *ngFor="let item of tickerData">
            <div class="ticker-item">
              <span class="symbol">{{item.symbol}}</span>
              <span [class.positive]="item.changePercent >= 0" [class.negative]="item.changePercent < 0">
                {{formatChangePercent(item.changePercent)}}
              </span>
            </div>
          </ng-container>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .ticker-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 50px;
      background-color: #000;
      overflow: hidden;
      z-index: 1000;
    }
    
    .ticker-wrap {
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: relative;
    }
    
    .ticker-move {
      display: flex;
      white-space: nowrap;
      padding-top: 12px;
      position: absolute;
      animation: ticker 30s linear infinite;
      width: 300%; /* Make it wide enough to contain all three copies */
    }
    
    .ticker-item {
      display: inline-block;
      margin-right: 40px;
    }
    
    .symbol {
      color: white;
      font-weight: bold;
      margin-right: 12px;
      font-size: 18px;
      font-family: monospace;
    }
    
    .positive {
      color: #4CAF50;
      font-weight: bold;
      font-size: 18px;
      font-family: monospace;
    }
    
    .negative {
      color: #F44336;
      font-weight: bold;
      font-size: 18px;
      font-family: monospace;
    }
    
    @keyframes ticker {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-33.33%); /* Move by 1/3 since we have 3 copies */
      }
    }
  `]
})
export class TickerTapeComponent implements OnInit {
  // More stocks to ensure we fill the ticker tape completely
  tickerData: TickerData[] = [
    { symbol: 'AAPL', changePercent: 2.45 },
    { symbol: 'MSFT', changePercent: 1.23 },
    { symbol: 'GOOGL', changePercent: -0.82 },
    { symbol: 'AMZN', changePercent: 3.16 },
    { symbol: 'TSLA', changePercent: -1.47 },
    { symbol: 'META', changePercent: 0.95 },
    { symbol: 'NFLX', changePercent: -2.31 },
    { symbol: 'XOM', changePercent: 1.58 },
    { symbol: 'CVX', changePercent: 0.37 },
    { symbol: 'COP', changePercent: 2.19 },
    { symbol: 'JPM', changePercent: 0.83 },
    { symbol: 'V', changePercent: 1.47 },
    { symbol: 'WMT', changePercent: -0.34 },
    { symbol: 'PG', changePercent: 0.65 }
  ];

  constructor() {}

  ngOnInit(): void {
    console.log('Ticker tape initialized with mock data');
  }

  formatChangePercent(changePercent: number): string {
    return (changePercent >= 0 ? '+' : '') + changePercent.toFixed(2) + '%';
  }
}