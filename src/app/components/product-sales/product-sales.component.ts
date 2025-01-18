import { Component, ViewChild, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MemberService } from 'src/services/member.service';
import { ToolService } from 'src/services/tool.service';
import { PublicationService } from 'src/services/publication.service';
import { EventService } from 'src/services/event.service';


@Component({
  selector: 'app-product-sales',
  standalone: true,
  imports: [MaterialModule, TablerIconsModule, MatButtonModule, NgApexchartsModule],
  templateUrl: './product-sales.component.html',
})
export class AppProductSalesComponent implements OnInit {

  @ViewChild('chart') chart: any;

  public productsalesChart: any;
  
  public memberCount: number = 0;
  public toolCount: number = 0;
  public publicationCount: number = 0;
  public eventCount: number = 0;

  constructor(
    private memberService: MemberService,
    private toolService: ToolService,
    private publicationService: PublicationService,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.fetchStatistics();
    this.initializeChart();
  }

  fetchStatistics(): void {
    // Fetch number of members (students + teachers)
    this.memberService.getNumberOfStudents().subscribe((studentsCount) => {
      this.memberCount = studentsCount;
    });

    // Fetch number of tools
    this.toolService.getAllTools().subscribe((tools) => {
      this.toolCount = tools.length;
    });

    // Fetch number of publications
    this.publicationService.getAllPublications().subscribe((publications) => {
      this.publicationCount = publications.length;
    });

    // Fetch number of events
    this.eventService.getAllEvents().subscribe((events) => {
      this.eventCount = events.length;
    });
  }

  initializeChart(): void {
    this.productsalesChart = {
      series: [
        {
          name: '',
          color: '#8763da',
          data: [25, 66, 20, 40, 12, 58, 20],
        },
      ],
      chart: {
        type: 'area',
        fontFamily: "'Plus Jakarta Sans', sans-serif;",
        foreColor: '#adb0bb',
        toolbar: {
          show: false,
        },
        height: 60,
        sparkline: {
          enabled: true,
        },
        group: 'sparklines',
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      fill: {
        colors: ['#8763da'],
        type: 'solid',
        opacity: 0.05,
      },
      markers: {
        size: 0,
      },
      tooltip: {
        theme: 'dark',
        x: {
          show: false,
        },
      },
    };
  }
}
