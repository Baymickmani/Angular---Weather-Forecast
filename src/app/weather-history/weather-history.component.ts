import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit  } from '@angular/core';
import { Chart } from 'chart.js';
import { CommonService } from '../shared/common.service';

export class Data {
  date: Date;
  temperature: Number;
  minTemperature: Number;
  maxTemperature: Number;
}

@Component({  
  selector: 'app-weather-history',
  templateUrl: './weather-history.component.html',
  styleUrls: ['./weather-history.component.css']  
})
export class WeatherHistoryComponent implements OnInit {
  @Input() latitude: string;
  @Input() longitude: string;
  @ViewChild('canvas') canvas: ElementRef;
  errorMessage = '';
  temperature:any = [];
  minTemperature: any = [];
  maxTemperature: any = [];
  historyData : any = [];
  date: any = [];
  title = 'app';
  data : Data[];
  chart:any = [];
  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.errorMessage = '';
    this.temperature = [];
    this.minTemperature = [];
    this.maxTemperature = [];
    this.historyData = [];
    this.date = [];
    this.data = [];
    this.chart = [];
    this.getHistoricWeatherData();
  }

  getHistoricWeatherData() {
    var stationCode;
    this.commonService.getStationCode(this.latitude, this.longitude).subscribe(res => {
      stationCode = res.data[0].id;
      this.commonService.fetchHistoricData(stationCode).subscribe(historicData => {
        this.historyData = historicData.data
        if(this.historyData.length > 0) {
          this.historyData.forEach((day: any)=>{ 
            this.date.push(day.date);
            this.temperature.push(day.temperature);
            this.minTemperature.push(day.temperature_min);
            this.maxTemperature.push(day.temperature_max);
            this.createChart();
         })
        } else {
          this.errorMessage = "No Historic Data Found";
        }
      }, error => this.errorMessage = "No Historic Data Found");
    });
    
  }

  ngAfterViewInit(){
    this.canvas = this.canvas.nativeElement.getContext('2d');
  }

  createChart() {
    this.chart = new Chart(this.canvas, {
        type: 'line',
        data: {
          labels: this.date,
          datasets: [ 
            {
              label: 'Temperature',
              data: this.temperature,
              borderColor: '#3cba9f',
              fill: true
            },
            {
              label: 'Min Temperature',
              data: this.minTemperature,  
              borderColor: '#000',
              fill: true
            },
            {
              label: 'Max Temperature',
              data: this.maxTemperature,
              borderColor: '#f00',
              fill: true
            }
          ]
        },
         options: {
          legend: {
            display: true
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
  });
  }
}