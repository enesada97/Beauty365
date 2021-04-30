import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexYAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexLegend,
  ApexFill,
  ApexResponsive,
} from 'ng-apexcharts';
import { AppointmentDto } from 'src/app/core/models/appointmentdto.model';
import { DailyReportDto } from 'src/app/core/models/daily-report-dto.model';
import { DashboardService } from 'src/app/core/service/dashboard.service';
import { AuthService } from 'src/app/core/service/system-service/auth.service';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  responsive: ApexResponsive[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  colors: string[];
};
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  public cardChart1: any;
  public cardChart1Data: any;
  public cardChart1Label: any;

  public cardChart2: any;
  public cardChart2Data: any;
  public cardChart2Label: any;

  public cardChart3: any;
  public cardChart3Data: any;
  public cardChart3Label: any;

  public cardChart4: any;
  public cardChart4Data: any;
  public cardChart4Label: any;

  public areaChartOptions: Partial<ChartOptions>;
  public barChartOptions: Partial<ChartOptions>;
  dailyReportDto:DailyReportDto;
  filledAppointmentDtos:AppointmentDto[];
  displayedColumns = [
    "patientName",
    "patientSurname",
    "departmentName",
    "doctorName",
    "doctorSurname",
    "typeName",
    "time",
    "phoneNumber",
    "patientHasArrive",
    "actions",
  ];
  dataSource: MatTableDataSource<AppointmentDto>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  constructor(public dashboardService:DashboardService,private authService:AuthService) {}
  ngOnInit() {
    this.getDailyReport();
    this.getFilledAppointmentsDto();
    this.smallChart1();
    this.smallChart2();
    this.smallChart3();
    this.smallChart4();
  }
  getDailyReport(){
    this.dashboardService.getDailyReport().subscribe(data=>{
      this.dailyReportDto=data;
    })
  }
  getFilledAppointmentsDto(){
    this.dashboardService.getFilledAppointmentsDto().subscribe(data=>{
      this.filledAppointmentDtos=data;
      setTimeout(() => (this.dashboardService.isTblLoading = false), 1000);
      this.dataSource = new MatTableDataSource<AppointmentDto>(
        this.filledAppointmentDtos
      );
      setTimeout(() => (this.dataSource.sort = this.sort));
      setTimeout(() => (this.dataSource.paginator = this.paginator));
    })
  }
  refresh(){
    this.getFilledAppointmentsDto();
  }
  checkClaim(claim:string):boolean{
		return this.authService.claimGuard(claim)
	}
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  private smallChart1() {
    this.cardChart1 = {
      responsive: true,
      tooltips: {
        enabled: false,
      },
      legend: {
        display: false,
      },
      scales: {
        yAxes: [
          {
            gridLines: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              beginAtZero: true,
              display: false,
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              drawBorder: false,
              display: false,
            },
            ticks: {
              display: false,
            },
          },
        ],
      },
      title: {
        display: false,
      },
    };
    this.cardChart1Data = [
      {
        label: 'New Patients',
        data: [50, 61, 80, 50, 72, 52, 60, 41, 30, 45, 70, 40, 93, 63, 50, 62],
        borderWidth: 4,
        pointStyle: 'circle',
        pointRadius: 4,
        borderColor: 'rgba(103,119,239,.7)',
        pointBackgroundColor: 'rgba(103,119,239,.2)',
        backgroundColor: 'rgba(103,119,239,.2)',
        pointBorderColor: 'transparent',
      },
    ];
    this.cardChart1Label = [
      '16-07-2018',
      '17-07-2018',
      '18-07-2018',
      '19-07-2018',
      '20-07-2018',
      '21-07-2018',
      '22-07-2018',
      '23-07-2018',
      '24-07-2018',
      '25-07-2018',
      '26-07-2018',
      '27-07-2018',
      '28-07-2018',
      '29-07-2018',
      '30-07-2018',
      '31-07-2018',
    ];
  }
  private smallChart2() {
    this.cardChart2 = {
      responsive: true,
      tooltips: {
        enabled: false,
      },
      legend: {
        display: false,
      },
      scales: {
        yAxes: [
          {
            gridLines: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              beginAtZero: true,
              display: false,
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              drawBorder: false,
              display: false,
            },
            ticks: {
              display: false,
            },
          },
        ],
      },
      title: {
        display: false,
      },
    };
    this.cardChart2Data = [
      {
        label: 'New Patients',
        data: [50, 61, 80, 50, 40, 93, 63, 50, 62, 72, 52, 60, 41, 30, 45, 70],
        borderWidth: 4,
        pointStyle: 'circle',
        pointRadius: 4,
        borderColor: 'rgba(253,126,20,.7)',
        pointBackgroundColor: 'rgba(253,126,20,.2)',
        backgroundColor: 'rgba(253,126,20,.2)',
        pointBorderColor: 'transparent',
      },
    ];
    this.cardChart2Label = [
      '16-07-2018',
      '17-07-2018',
      '18-07-2018',
      '19-07-2018',
      '20-07-2018',
      '21-07-2018',
      '22-07-2018',
      '23-07-2018',
      '24-07-2018',
      '25-07-2018',
      '26-07-2018',
      '27-07-2018',
      '28-07-2018',
      '29-07-2018',
      '30-07-2018',
      '31-07-2018',
    ];
  }
  private smallChart3() {
    this.cardChart3 = {
      responsive: true,
      tooltips: {
        enabled: false,
      },
      legend: {
        display: false,
      },
      scales: {
        yAxes: [
          {
            gridLines: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              beginAtZero: true,
              display: false,
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              drawBorder: false,
              display: false,
            },
            ticks: {
              display: false,
            },
          },
        ],
      },
      title: {
        display: false,
      },
    };
    this.cardChart3Data = [
      {
        label: 'New Patients',
        data: [52, 60, 41, 30, 45, 70, 50, 61, 80, 50, 72, 40, 93, 63, 50, 62],
        borderWidth: 4,
        pointStyle: 'circle',
        pointRadius: 4,
        borderColor: 'rgba(40,167,69,.7)',
        pointBackgroundColor: 'rgba(40,167,69,.2)',
        backgroundColor: 'rgba(40,167,69,.2)',
        pointBorderColor: 'transparent',
      },
    ];
    this.cardChart3Label = [
      '16-07-2018',
      '17-07-2018',
      '18-07-2018',
      '19-07-2018',
      '20-07-2018',
      '21-07-2018',
      '22-07-2018',
      '23-07-2018',
      '24-07-2018',
      '25-07-2018',
      '26-07-2018',
      '27-07-2018',
      '28-07-2018',
      '29-07-2018',
      '30-07-2018',
      '31-07-2018',
    ];
  }
  private smallChart4() {
    this.cardChart4 = {
      responsive: true,
      tooltips: {
        enabled: false,
      },
      legend: {
        display: false,
      },
      scales: {
        yAxes: [
          {
            gridLines: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              beginAtZero: true,
              display: false,
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              drawBorder: false,
              display: false,
            },
            ticks: {
              display: false,
            },
          },
        ],
      },
      title: {
        display: false,
      },
    };
    this.cardChart4Data = [
      {
        label: 'New Patients',
        data: [30, 45, 70, 40, 93, 63, 50, 62, 50, 61, 80, 50, 72, 52, 60, 41],
        borderWidth: 4,
        pointStyle: 'circle',
        pointRadius: 4,
        borderColor: 'rgba(0,123,255,.7)',
        pointBackgroundColor: 'rgba(0,123,255,.2)',
        backgroundColor: 'rgba(0,123,255,.2)',
        pointBorderColor: 'transparent',
      },
    ];
    this.cardChart4Label = [
      '16-07-2018',
      '17-07-2018',
      '18-07-2018',
      '19-07-2018',
      '20-07-2018',
      '21-07-2018',
      '22-07-2018',
      '23-07-2018',
      '24-07-2018',
      '25-07-2018',
      '26-07-2018',
      '27-07-2018',
      '28-07-2018',
      '29-07-2018',
      '30-07-2018',
      '31-07-2018',
    ];
  }
}
