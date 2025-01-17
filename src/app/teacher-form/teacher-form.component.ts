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
  selector: 'app-teacher-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, RouterModule],
  templateUrl: './teacher-form.component.html', // Update the template URL if needed
  styleUrls: ['./teacher-form.component.scss'], // Update the style URL if needed
})
export class TeacherFormComponent implements OnInit {
  form: FormGroup;
  memberGlobal!: Member;
  type!: string;

  constructor(
    private memberService: MemberService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.form = new FormGroup({
      cin: new FormControl(null, [
        Validators.required,
        Validators.maxLength(8),
      ]),
      nom: new FormControl(null, [Validators.required]),
      prenom: new FormControl(null, [Validators.required]),
      dateNaissance: new FormControl(null, [Validators.required]),
      cv: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      grade: new FormControl(null, [Validators.required]),
      etablissement: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    const idCourant = this.activatedRoute.snapshot.params['id'];
    if (!!idCourant) {
      this.memberService.getMemberByID(idCourant).subscribe((item: Member) => {
        this.memberGlobal = item;
        this.editForm(item);
      });
    }
  }

  editForm(m: Member): void {
    this.form.patchValue({
      cin: m.cin,
      nom: m.name,
      prenom: m.prenom,
      dateNaissance: m.dateNaissance,
      cv: m.cv,
      email: m.email,
      grade: m.grade,
      etablissement: m.etablissement,
    });
  }

  OnSubmit(): void {
    const idCourant = this.activatedRoute.snapshot.params['id'];
    const Member = {
      ...this.memberGlobal,
      ...this.form.value,
    };
    console.log(Member);
    if (!!idCourant) {
      this.memberService.updateMember(idCourant, Member).subscribe(() => {
        this.router.navigate(['/ui-components/teachers']); 
      });
    } else {
      this.memberService.SaveEnseignant(Member).subscribe(() => {
        this.router.navigate(['/ui-components/teachers']); 
      });
    }
  }
}
