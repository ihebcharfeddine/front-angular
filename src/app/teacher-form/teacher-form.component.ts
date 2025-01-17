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
  templateUrl: './teacher-form.component.html',
  styleUrls: ['./teacher-form.component.scss'],
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
      password: new FormControl('***', [Validators.required]), // Default password value is '***'
    });
  }

  ngOnInit(): void {
    const idCourant = this.activatedRoute.snapshot.params['id'];
    if (!!idCourant) {
      this.memberService.getMemberByid(idCourant).subscribe((item: Member) => {
        this.memberGlobal = item;
        this.editForm(item);
      });
    }
  }

  editForm(m: Member): void {
    this.form.patchValue({
      cin: m.cin,
      nom: m.nom,
      prenom: m.prenom,
      dateNaissance: m.dateNaissance,
      cv: m.cv,
      email: m.email,
      grade: m.grade,
      etablissement: m.etablissement,
      password: '***', // Ensure the password is reset to default
    });
  }

  OnSubmit(): void {
    const idCourant = this.activatedRoute.snapshot.params['id'];
    const teacher = {
      ...this.memberGlobal,
      ...this.form.value,
    };

    // Ensure password is set (default is '***' if not modified by user)
    if (!teacher.password || teacher.password === '***') {
      teacher.password = '***'; // Keep it as '***' if it's empty or unchanged
    }

    console.log('Teacher Data being submitted:', teacher);

    if (!!idCourant) {
      this.memberService.updateEnseignant(idCourant, teacher).subscribe(() => {
        this.router.navigate(['/ui-components/teachers']); 
      });
    } else {
      this.memberService.SaveEnseignant(teacher).subscribe(() => {
        this.router.navigate(['/ui-components/teachers']); 
      });
    }
  }
}
