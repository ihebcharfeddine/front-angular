import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MemberService } from '../services/member.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';
import { Member } from '../model/Member';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-member-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, RouterModule],
  templateUrl: './member-form.component.html',
  styleUrl: './member-form.component.scss',
})
export class MemberFormComponent implements OnInit {
  form: FormGroup;
  constructor(
    private memberService: MemberService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    // Initialize the form in the constructor
    this.form = new FormGroup({
      cin: new FormControl(null, [Validators.required]),
      cv: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      type: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    const idCourant = this.activatedRoute.snapshot.params['id'];
    console.log(idCourant);
    if (!!idCourant) {
      this.memberService.getMemberByID(idCourant).subscribe((m: Member) => {
        this.editForm(m);
      });
    }
  }

  editForm(m: Member): void {
    // Use patchValue to update the form controls
    this.form.patchValue({
      cin: m.cin,
      cv: m.cv,
      name: m.name,
      type: m.type,
    });
  }

  // Submit form data
  sub(): void {
    const idCourant = this.activatedRoute.snapshot.params['id'];
    if (!!idCourant) {
      const m = {
        ...this.form.value,
        createdDate: new Date().toISOString(),
      };
      this.memberService.updateMember(idCourant, m).subscribe(() => {
        this.router.navigate(['ui-components/members']);
      });
    } else {
      const formData = {
        ...this.form.value,
        createdDate: new Date().toISOString(),
      };

      this.memberService.add(formData).subscribe(() => {
        this.router.navigate(['ui-components/members']);
      });
    }
  }
}
