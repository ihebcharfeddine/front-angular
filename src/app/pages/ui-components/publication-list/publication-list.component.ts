import { Component } from '@angular/core';
import { Publication } from '../../../../model/Publication';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from '../../../material.module';
import { PublicationService } from 'src/services/publication.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-publication-list',
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MaterialModule,
    RouterModule,
    MatDialogModule,
  ],
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.scss'],
})
export class PublicationListComponent {
  constructor(
    private PS: PublicationService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  displayedColumns: string[] = [
    'id',
    'type',
    'titre',
    'lien',
    'date',
    'sourcepdf',
    'actions',
  ];
  dataSource: Publication[] = [];

  ngOnInit(): void {
    this.PS.getAllPublications().subscribe((data) => {
      this.dataSource = data;
    });
  }

  addPublication() {
    this.router.navigate(['/ui-components/publications/create']);
  }
  OpenDialog() {
    this.router.navigate(['/ui-components/publications/affPub']);
  }

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    if (filterValue.length === 0) {
      console.log('No filter value entered, fetching all events.');
      this.PS.getAllPublications().subscribe(
        (data) => {
          this.dataSource = data;
        },
        (error) => {
          console.error('Error fetching all events:', error);
        }
      );
      return;
    }

    this.PS.getPublicationsByTitle(filterValue).subscribe(
      (filteredData) => {
        this.dataSource = filteredData;
      },
      (error) => {
        console.error('Error fetching filtered events:', error);
      }
    );
  }

  delete(id: number) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { message: 'Are you sure you want to delete this publication?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.PS.deletePublication(id).subscribe(() => {
          this.PS.getAllPublications().subscribe((data) => {
            this.dataSource = data;
          });
        });
      }
    });
  }
}
