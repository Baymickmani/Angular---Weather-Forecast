import { Component, OnInit } from '@angular/core';
import { CommonService } from '../shared/common.service';
@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.css']
})
export class CitySearchComponent implements OnInit {
  cityName = 'Vijayawada';
  coordinates: any = [];
  errorMessage = '';
  showWeatherForecast = false;
  showWeatherHistory = false;
  constructor(private commonService: CommonService) { }

  ngOnInit() {
    
  }

  onSearch(){
    this.coordinates = [];
    this.errorMessage = '';
    this.showWeatherForecast = false;
    this.showWeatherHistory = false;
    this.commonService.fetchLatAndLong(this.cityName).subscribe(result=>{
      if(result!== undefined && result.results.length > 0) {
        result.results.forEach((city: any)=> {
          this.coordinates.push({ CityName: city.formatted, Latitude: city.geometry.lat, Longitude: city.geometry.lng})
        })
      } else {
        this.errorMessage = "No records found with the given City Name!!"
      }
    }, error => { this. errorMessage = "No records found with the given City Name!!"});
    }

    getWeatherForecast() {
      this.showWeatherForecast = true;
      this.showWeatherHistory = false;
    }

    getWeatherHistory() {
      this.showWeatherHistory = true;
      this.showWeatherForecast = false;
    }
}