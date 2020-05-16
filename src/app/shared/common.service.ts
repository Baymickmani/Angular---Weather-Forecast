import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { DatePipe } from '@angular/common';
import {map} from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class CommonService {
  constructor(private http: HttpClient, private datePipe: DatePipe){}

  fetchLatAndLong(cityName) {
    let url = 'https://api.opencagedata.com/geocode/v1/json?q='+cityName+'&key='+environment.openCageAPIKey;
    return this.http.get(url)
            .pipe(map(this.extractData));
  }

  fetchForecastData(latitude, longitude) {
    let url = `https://weather.ls.hereapi.com/weather/1.0/report.json?apiKey=`+environment.hereAPIKey+`&product=forecast_7days_simple&latitude=`+latitude+`&longitude=`+longitude;
    // let url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+longt+'&//appid=d403282efcfa57609c28d18d071696a8';
    return this.http.get(url).pipe(map(this.extractData));
  }

  getStationCode(latitude, longitude) {
    // Fetcht the station code with latitude and longitude
    let url = 'https://api.meteostat.net/v1/stations/nearby?lat='+latitude+'&lon='+longitude+'&limit=1&key='+environment.metoStatAPIKey;
    return this.http.get(url).pipe(map(this.extractData));
  }

  fetchHistoricData(stationCode) {
    let startDate = this.datePipe.transform(new Date(new Date().getFullYear(), new Date().getMonth(), 1), 'yyyy-MM-dd');
    let currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    let url = `https://api.meteostat.net/v1/history/daily?station=`+stationCode+`&start=`+startDate+`&end=`+currentDate+`&key=`+environment.metoStatAPIKey;
    return this.http.get(url).pipe(map(this.extractData));
  }

  private extractData(res: Response) {
    return res || {};
  }
}