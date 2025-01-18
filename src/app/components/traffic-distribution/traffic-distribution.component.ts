import { Component, ViewChild, OnInit } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { MatButtonModule } from '@angular/material/button';

import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexYAxis,
  ApexGrid,
  ApexPlotOptions,
  ApexFill,
  ApexMarkers,
  ApexResponsive,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { MemberService } from 'src/services/member.service';

export interface trafficdistributionChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  grid: ApexGrid;
  marker: ApexMarkers;
}

@Component({
  selector: 'app-traffic-distribution',
  standalone: true,
  imports: [
    MaterialModule,
    TablerIconsModule,
    MatButtonModule,
    NgApexchartsModule,
  ],
  templateUrl: './traffic-distribution.component.html',
})
export class AppTrafficDistributionComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);

  public trafficdistributionChart!: Partial<trafficdistributionChart> | any;

  constructor(private memberService: MemberService) {}

  ngOnInit(): void {
    this.updateChartData();
  }

  updateChartData(): void {
    // Fetch the number of students and teachers using the service
    this.memberService.getNumberOfStudents().subscribe((studentCount) => {
      this.memberService.getNumberOfTeachers().subscribe((teacherCount) => {
        this.trafficdistributionChart = {
          series: [teacherCount, studentCount],  // Update series with dynamic values
          labels: ['Teacher', 'Students'],
          chart: {
            type: 'donut',
            fontFamily: "'Plus Jakarta Sans', sans-serif;",
            foreColor: '#adb0bb',
            toolbar: {
              show: false,
            },
            height: 160,
          },
          colors: ['#fb977d', '#0085db'],
          plotOptions: {
            pie: {
              donut: {
                size: '80%',
                background: 'none',
                labels: {
                  show: true,
                  name: {
                    show: true,
                    fontSize: '12px',
                    color: undefined,
                    offsetY: 5,
                  },
                  value: {
                    show: true,  // Show the numeric value
                    color: '#98aab4',
                    fontSize: '14px',  // Customize the font size
                    fontWeight: 'bold',  // Make the number bold
                  },
                },
              },
            },
          },
          stroke: {
            show: false,
          },
          dataLabels: {
            enabled: false,
          },
          legend: {
            show: false,
          },
          responsive: [
            {
              breakpoint: 991,
              options: {
                chart: {
                  width: 120,
                },
              },
            },
          ],
          tooltip: {
            enabled: false,
          },
        };
      });
    });
  }
  
}
