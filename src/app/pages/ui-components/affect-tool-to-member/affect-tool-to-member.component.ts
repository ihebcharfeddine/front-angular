import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Member } from 'src/model/Member';
import { Tool } from 'src/model/Tool';
import { MaterialModule } from '../../../material.module';
import { MemberService } from 'src/services/member.service';
import { ToolService } from 'src/services/tool.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Membre_Outil } from 'src/model/Membre_Outil';

@Component({
  selector: 'app-affect-tool-to-member',
  templateUrl: './affect-tool-to-member.component.html',
  styleUrls: ['./affect-tool-to-member.component.scss'],
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule, RouterModule],
})
export class AffectToolToMemberComponent implements OnInit {
  form!: FormGroup;
  dataMembers: Member[] = [];
  dataTools: Tool[] = [];

  constructor(
    private memberService: MemberService,
    private toolService: ToolService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.fetchData();
  }

  // Initialize the form with memberId and toolId controls
  initializeForm(): void {
    this.form = this.fb.group({
      toolId: new FormControl(null), // Store the tool ID
      memberId: new FormControl(null), // Store the member ID
    });
  }

  // Fetch members and tools from the backend
  fetchData(): void {
    this.memberService.getAllMembers().subscribe((members) => {
      this.dataMembers = members;
    });

    this.toolService.getAllTools().subscribe((tools) => {
      this.dataTools = tools;
    });
  }

  // Handle form submission
  save(): void {
    if (this.form.valid) {
      const memberId = this.form.value.memberId;
      const toolId = this.form.value.toolId;
  
      const memberOutil: Membre_Outil = {
        membre_id: memberId,
        outil_id: toolId,
      };
  
      console.log('Payload:', memberOutil);
  
      this.memberService.affecterOutil(memberOutil).subscribe(
        () => {
          console.log('Tool affected to member successfully!');
          this.router.navigate(['/ui-components/tools']);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }
  }
  

  close(): void {
    this.router.navigate(['/ui-components/tools']).then(() => {
      console.log('Navigated back to tools page');
    });
  }
}
