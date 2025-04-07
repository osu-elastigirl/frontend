import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ticker-tape',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ticker-container">
      <div class="ticker-wrap" #tickerWrap>
        <div class="ticker-move" #tickerMove>
          <ng-container *ngFor="let item of tickerData">
            <div class="ticker-item">
              <span class="symbol">{{item.symbol}}</span>
              <span [class.positive]="item.changePercent >= 0" [class.negative]="item.changePercent < 0">
                {{formatChangePercent(item.changePercent)}}
              </span>
            </div>
          </ng-container>
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
      height: 40px;
      background-color: #000;
      overflow: hidden;
      z-index: 1000;
    }
    
    .ticker-wrap {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    
    .ticker-move {
      display: inline-block;
      white-space: nowrap;
      padding-top: 10px;
    }
    
    .ticker-item {
      display: inline-block;
      margin-right: 30px;
    }
    
    .symbol {
      color: white;
      font-weight: bold;
      margin-right: 10px;
    }
    
    .positive {
      color: #4CAF50;
      font-weight: bold;
    }
    
    .negative {
      color: #F44336;
      font-weight: bold;
    }
  `]
})
export class TickerTapeComponent implements OnInit, AfterViewInit {
  @ViewChild('tickerMove') tickerMove!: ElementRef;
  @ViewChild('tickerWrap') tickerWrap!: ElementRef;
  
  tickerData = [
    { symbol: 'AAPL', changePercent: 1.45 },
    { symbol: 'MSFT', changePercent: 0.87 },
    { symbol: 'GOOGL', changePercent: -0.52 },
    { symbol: 'AMZN', changePercent: 2.31 },
    { symbol: 'META', changePercent: -1.18 },
    { symbol: 'TSLA', changePercent: 3.67 },
    { symbol: 'NFLX', changePercent: -0.25 },
    { symbol: 'NVDA', changePercent: 4.21 },
    { symbol: 'JPM', changePercent: 0.63 },
    { symbol: 'V', changePercent: -0.42 },
    { symbol: 'WMT', changePercent: 0.75 },
    { symbol: 'PG', changePercent: -0.33 },
    { symbol: 'JNJ', changePercent: 1.12 },
    { symbol: 'UNH', changePercent: -0.88 },
    { symbol: 'HD', changePercent: 2.56 }
  ];

  ngOnInit(): void {
    console.log('Ticker component initialized with data:', this.tickerData);
  }

  ngAfterViewInit() {
    // Start the animation after view is initialized
    this.startAnimation();
  }

  startAnimation() {
    if (!this.tickerMove || !this.tickerWrap) return;
    
    const tickerEl = this.tickerMove.nativeElement;
    const wrapperEl = this.tickerWrap.nativeElement;
    
    // Calculate animation duration based on content length
    const duration = tickerEl.offsetWidth / 100; // pixels per second
    
    // Apply dynamic animation
    tickerEl.style.animation = `ticker ${duration}s linear infinite`;
    tickerEl.style.transform = 'translateX(0)'; // start position
    
    // Add animation keyframes dynamically
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes ticker {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
    `;
    document.head.appendChild(style);
  }

  formatChangePercent(changePercent: number): string {
    return (changePercent >= 0 ? '+' : '') + changePercent.toFixed(2) + '%';
  }
}