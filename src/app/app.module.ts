import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TickerTapeComponent } from './ticker-tape/ticker-tape.component';

@NgModule({
  declarations: [
    AppComponent,
    TickerTapeComponent
  ],
  imports: [
    BrowserModule,
    // other imports
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }