import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';


import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { CitySearchComponent } from './city-search/city-search.component';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';
import { WeatherHistoryComponent } from './weather-history/weather-history.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule],
  declarations: [ AppComponent, HelloComponent, CitySearchComponent, WeatherForecastComponent, WeatherHistoryComponent ],
  providers: [DatePipe],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
