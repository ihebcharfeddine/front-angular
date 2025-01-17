import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Member } from 'src/model/Member';

import { MaterialModule } from '../../../material.module';
import { MemberService } from 'src/services/member.service';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Membre_Outil } from 'src/model/Membre_Outil';
import { PublicationService } from 'src/services/publication.service';
import { Publication } from 'src/model/Publication';
import { Membre_Publication } from 'src/model/Membre_Publication';

@Component({
  selector: 'app-affect-tool-to-member',
  templateUrl: './affect-publication-to-member.component.html',
  styleUrls: ['./affect-publication-to-member.component.scss'],
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule, RouterModule],
})
export class AffectPublicationToMemberComponent {
  form!: FormGroup;
  dataMembers: Member[] = [];
  dataPubs: Publication[] = [];

  constructor(
    private memberService: MemberService,
    private publicationService: PublicationService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.fetchData();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      publicationId: new FormControl(null),
      memberId: new FormControl(null),
    });
  }

  fetchData(): void {
    this.memberService.getAllMembers().subscribe((members) => {
      this.dataMembers = members;
    });

    this.publicationService.getAllPublications().subscribe((publications) => {
      this.dataPubs = publications;
    });
  }

  save(): void {
    if (this.form.valid) {
      const memberId = this.form.value.memberId;
      const pubId = this.form.value.publicationId; 
  
      const memberPub: Membre_Publication = {
        auteur_id: memberId,
        publication_id: pubId,
      };
  
      console.log('Payload:', memberPub);
  
      this.memberService.affecterPublication(memberPub).subscribe(
        () => {
          console.log('Publication affected to auteur successfully!');
          this.router.navigate(['/ui-components/publications']);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }
  }

  close(): void {
    this.router.navigate(['/ui-components/publications']).then(() => {
      console.log('Navigated back to publications page');
    });
  }
}
