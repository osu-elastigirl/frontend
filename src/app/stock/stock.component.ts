import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Stock } from '../stock';

@Component({
  selector: 'app-stock',
  imports: [CommonModule],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.scss'
})
export class StockComponent {
  @Input() stock!: Stock;
}
