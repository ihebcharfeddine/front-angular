import { Component, OnInit } from '@angular/core';
import { Event } from '../../../model/Event'; // Replace with your Event model path
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from '../../../material.module'; // Replace with your Material module path
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../confirm-dialog/confirm-dialog.component'; // Replace with your ConfirmDialog path
import { EventService } from 'src/app/services/event.service'; // Replace with your EventService path

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MaterialModule,
    RouterModule,
    MatDialogModule,
  ],
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent implements OnInit {
  constructor(
    private eventService: EventService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  displayedColumns: string[] = [
    'id',
    'titre',
    'datedebut',
    'datefin',
    'lieu',
    'icons',
  ];

  dataSource: Event[] = [];

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe((data) => {
      console.log(data);
      this.dataSource = data;
    });
  }

  addEvent() {
    this.router.navigate(['/ui-components/events/create']);
  }

  deleteEvent(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { message: 'Are you sure you want to delete this event?' },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.eventService.deleteEvent(id).subscribe(() => {
          this.eventService.getAllEvents().subscribe((data) => {
            this.dataSource = data;
          });
        });
      }
    });
  }
}
