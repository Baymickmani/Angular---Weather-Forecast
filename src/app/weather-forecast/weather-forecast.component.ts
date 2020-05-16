import { Component, OnInit, Input } from '@angular/core';

import { CommonService } from '../shared/common.service'; 

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css']
})
export class WeatherForecastComponent implements OnInit {
  @Input() latitude: string;
  @Input() longitude: string;
  errorMessage = '';
  foreCastData: any = [];
  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.foreCastData = [];
    this.errorMessage = '';
    console.log(this.latitude);
    this.getWeatherForecast();
  }

  getWeatherForecast() {
    this.commonService.fetchForecastData(this.latitude, this.longitude).subscribe(weatherForecast=>{
      if(weatherForecast !== undefined) {
        console.log(weatherForecast);
        weatherForecast.dailyForecasts.forecastLocation.forecast.forEach((day: any)=>{
          this.foreCastData.push({
                  date: new Date(day.utcTime).toLocaleDateString(),
                  temperature: { High: day.highTemperature, Low: day.lowTemperature },
                  humidity: day.humidity,
                  icon: 'https://weather.api.here.com/static/weather/icon/' + day.iconLink.split('/').slice(-1)[0]
                  })
        })
        this.foreCastData = this.foreCastData.slice(0,4);
      } else {
        this.errorMessage = "No weather data found for this location";
      }
    }, error => this.errorMessage = "No weather data found for this location");
  }

}