import { Component } from '@angular/core';
import { Member } from '../../../model/Member';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from '../../../material.module';
import { MemberService } from 'src/app/services/member.service';
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
    'name',
    'type',
    'cv',
    'createdDate',
    'icons',
  ];
  dataSource: Member[] = [];

  ngOnInit(): void {
    this.MS.getAllMembers().subscribe((data) => {
      this.dataSource = data;
    });
  }

  addMember() {
    this.router.navigate(['/ui-components/create']);
  }

  delete(id: string) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { message: 'Are you sure you want to delete this member?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.MS.deleteMember(id).subscribe(() => {
          this.MS.getAllMembers().subscribe((data) => {
            this.dataSource = data;
          });
        });
      }
    });
  }
}
