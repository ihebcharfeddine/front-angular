import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from '../../../material.module';
import { ToolService } from 'src/services/tool.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../confirm-dialog/confirm-dialog.component';
import { Tool } from 'src/model/Tool';

@Component({
  selector: 'app-tool-list',
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MaterialModule,
    RouterModule,
    MatDialogModule,
  ],
  templateUrl: './tool-list.component.html',
  styleUrl: './tool-list.component.scss',
})
export class ToolListComponent implements OnInit {
  constructor(
    private toolService: ToolService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  displayedColumns: string[] = ['id', 'date', 'source', 'actions'];
  dataSource: Tool[] = [];

  ngOnInit(): void {
    this.toolService.getAllTools().subscribe((data) => {
      this.dataSource = data;
    });
  }

  addTool() {
    this.router.navigate(['/ui-components/tools/create']);
  }

  OpenDialog() {
    this.router.navigate(['/ui-components/tools/affTool']);
  }

  delete(id: number) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { message: 'Are you sure you want to delete this tool?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.toolService.deleteTool(id).subscribe(() => {
          this.toolService.getAllTools().subscribe((data) => {
            this.dataSource = data;
          });
        });
      }
    });
  }
}
