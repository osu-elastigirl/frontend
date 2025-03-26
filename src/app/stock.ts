export class Stock {
  ticker: string;
  rationale: string;
  metrics: {[key: string]: any};

  constructor(ticker: string, rationale: string, metrics: {[key: string]: any}) {
    this.ticker = ticker;
    this.rationale = rationale;
    this.metrics = metrics;
  }
}
