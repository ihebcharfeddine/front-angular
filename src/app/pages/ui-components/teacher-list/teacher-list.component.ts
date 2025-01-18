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
  templateUrl: './teacher-list.component.html',
  styleUrl: './teacher-list.component.scss',
})
export class TeacherListComponent {
  constructor(
    private MS: MemberService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  displayedColumns: string[] = [
    'id',
    'cin',
    'name',
    'grade',
    'etablissement',
    'cv',
    'dateDeNaissance',
    'icons',
  ];

  dataSource: Member[] = [];

  ngOnInit(): void {
    this.MS.getAllTeachers().subscribe((data) => {
      this.dataSource = data;
      console.log(data);
    });
  }

  addMember() {
    this.router.navigate(['/ui-components/teachers/create']);
  }

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    if (filterValue.length === 0) {
      console.log('No filter value entered, fetching all events.');
      this.MS.getAllTeachers().subscribe(
        (data) => {
          this.dataSource = data;
        },
        (error) => {
          console.error('Error fetching all events:', error);
        }
      );
      return;
    }

    this.MS.getTeachersByTitle(filterValue).subscribe(
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
      data: { message: 'Are you sure you want to delete this Teacher?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.MS.deleteMemberByid(id).subscribe(() => {
          this.MS.getAllTeachers().subscribe((data) => {
            this.dataSource = data;
          });
        });
      }
    });
  }
}
