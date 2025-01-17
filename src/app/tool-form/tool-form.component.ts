import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MaterialModule } from '../material.module';
import { ToolService } from '../../services/tool.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tool } from '../../model/Tool';

@Component({
  selector: 'app-tool-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './tool-form.component.html',
  styleUrls: ['./tool-form.component.scss'],
})
export class ToolFormComponent implements OnInit {
  toolForm: FormGroup;

  constructor(
    private toolService: ToolService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    // Initialize form group with `source` and `date` fields
    this.toolForm = new FormGroup({
      source: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    const idCourant = this.activatedRoute.snapshot.params['id']; // Get current ID from route params
    console.log(`Current ID: ${idCourant}`);
    if (!!idCourant) {
      this.toolService.getToolById(idCourant).subscribe((tool: Tool) => {
        this.editForm(tool);
      });
    }
  }

  // Populate form for editing
  editForm(tool: Tool): void {
    this.toolForm.patchValue({
      source: tool.source,
      date: tool.date,
    });
  }

  // Handle form submission
  onSubmit(): void {
    const idCourant = this.activatedRoute.snapshot.params['id'];
    if (!!idCourant) {
      // Update existing tool
      const toolData = {
        ...this.toolForm.value,
        updatedDate: new Date().toISOString(),
      };
      this.toolService.updateTool(idCourant, toolData).subscribe(() => {
        this.router.navigate(['ui-components/tools']);
      });
    } else {
      // Add new tool
      const toolData = {
        ...this.toolForm.value,
        createdDate: new Date().toISOString(),
      };
      this.toolService.addTool(toolData).subscribe(() => {
        this.router.navigate(['ui-components/tools']);
      });
    }
  }
}
