import { Component } from '@angular/core';
import { Member } from '../../../../model/Member';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from '../../../material.module';
import { MemberService } from 'src/services/member.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MaterialModule,
    RouterModule,
    MatDialogModule,
  ],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.scss',
})
export class MemberListComponent {
  constructor(
    private MS: MemberService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  displayedColumns: string[] = [
    'id',
    'cin',
    'nom',
    'cv',
    'dateDeNaissance',
    'dateInscription',
    'diplome',
    'icons',
  ];
  dataSource: Member[] = [];

  ngOnInit(): void {
    this.MS.getAllStudents().subscribe((data) => {
      this.dataSource = data;
      console.log(data);
    });
  }

  addMember() {
    this.router.navigate(['/ui-components/students/create']);
  }

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    if (filterValue.length === 0) {
      console.log('No filter value entered, fetching all events.');
      this.MS.getAllStudents().subscribe(
        (data) => {
          this.dataSource = data;
        },
        (error) => {
          console.error('Error fetching all events:', error);
        }
      );
      return;
    }

    this.MS.getStudentsByTitle(filterValue).subscribe(
      (filteredData) => {
        this.dataSource = filteredData;
      },
      (error) => {
        console.error('Error fetching filtered events:', error);
      }
    );
  }

  delete(id: string) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { message: 'Are you sure you want to delete this member?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.MS.deleteMemberByid(id).subscribe(() => {
          this.MS.getAllStudents().subscribe((data) => {
            this.dataSource = data;
          });
        });
      }
    });
  }
}
