import { Component, ViewChild, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from 'src/app/material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { NgApexchartsModule } from 'ng-apexcharts';
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
} from 'ng-apexcharts';
import { MemberService } from 'src/services/member.service';

interface profitExpanceChart {
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
  selector: 'app-profit-expenses',
  standalone: true,
  imports: [MaterialModule, TablerIconsModule, MatButtonModule, NgApexchartsModule],
  templateUrl: './profit-expenses.component.html',
})
export class AppProfitExpensesComponent implements OnInit {

  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  public profitExpanceChart!: Partial<profitExpanceChart> | any;

  constructor(private memberService: MemberService) {}

  ngOnInit() {
    this.memberService.getStudentDistributionByDiploma().subscribe((distribution) => {
      // Prepare chart data based on the distribution
      const categories = Object.keys(distribution);
      const values = Object.values(distribution);

      // Update the chart's x-axis categories and series data
      this.profitExpanceChart = {
        series: [
          {
            name: 'Number of Students',
            data: values,
            color: '#0085db',
          },
        ],
        chart: {
          type: 'bar',
          height: 390,
          offsetY: 10,
          foreColor: '#adb0bb',
          fontFamily: 'inherit',
          toolbar: { show: false },
        },
        grid: {
          borderColor: 'rgba(0,0,0,0.1)',
          strokeDashArray: 3,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '30%',
            borderRadius: 4,
            endingShape: "rounded",
          },
        },
        dataLabels: { enabled: false },
        markers: { size: 0 },
        legend: { show: false },
        xaxis: {
          type: 'category',
          categories: categories, // Dynamically populate categories
          axisTicks: { show: false },
          axisBorder: { show: false },
          labels: { style: { cssClass: 'grey--text lighten-2--text fill-color' } },
        },
        stroke: {
          show: true,
          width: 5,
          colors: ['transparent'],
        },
        tooltip: { theme: 'light' },
        responsive: [
          {
            breakpoint: 600,
            options: {
              plotOptions: { bar: { borderRadius: 3 } },
            },
          },
        ],
      };
    });
  }
}
