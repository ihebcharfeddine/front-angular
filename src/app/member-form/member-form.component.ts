import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MemberService } from 'src/services/member.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { Member } from 'src/model/Member';

@Component({
  selector: 'app-member-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, RouterModule],
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css'],
})
export class MemberFormComponent implements OnInit {
  form: FormGroup;
  memberGlobal!: Member;
  type!: string;

  constructor(
    private memberService: MemberService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.form = new FormGroup({
      cin: new FormControl(null, [Validators.required]),
      nom: new FormControl(null, [Validators.required]),
      prenom: new FormControl(null, [Validators.required]),
      dateNaissance: new FormControl(null, [Validators.required]),
      cv: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl('********', [Validators.required]),
      dateInscription: new FormControl(null),
      diplome: new FormControl(null),
      grade: new FormControl(null),
      etablissement: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.checkMemberType();
    const idCourant = this.activatedRoute.snapshot.params['id'];
    if (!!idCourant) {
      this.memberService.getMemberByID(idCourant).subscribe((item: Member) => {
        this.memberGlobal = item;
        this.editForm(item);
      });
    }
  }

  checkMemberType(): void {
    const url = window.location.href;
    this.type = url.includes('teacher') ? 'teacher' : 'student';
  }

  editForm(m: Member): void {
    this.form.patchValue({
      cin: m.cin,
      name: m.name,
      prenom: m.prenom,
      dateNaissance: m.dateNaissance,
      cv: m.cv,
      email: m.email,
      password: '********',
      dateInscription: m.dateInscription,
      diplome: m.diplome,
      grade: m.grade,
      etablissement: m.etablissement,
    });
  }

  OnSubmit(): void {
    const idCourant = this.activatedRoute.snapshot.params['id'];
    const member1 = {
      ...this.memberGlobal,
      ...this.form.value,
    };
    const member2 = {
      ...member1,
      createdDate: member1.createdDate ?? new Date().toISOString(),
    };

    if (!!idCourant) {
      // Update existing member
      this.memberService.updateMember(idCourant, member2).subscribe(() => {
        this.router.navigate([
          this.type === 'teacher' ? '/teacher' : '/student',
        ]);
      });
    } else {
      // Create new member
      if (this.type === 'teacher') {
        this.memberService.SaveEnseignant(member2).subscribe(() => {
          this.router.navigate(['/teacher']);
        });
      } else {
        this.memberService.SaveEtudiant(member2).subscribe(() => {
          this.router.navigate(['/student']);
        });
      }
    }
  }
}
