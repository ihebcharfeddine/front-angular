import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PublicationService } from '../../services/publication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';
import { Publication } from '../../model/Publication';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-publication-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, RouterModule],
  templateUrl: './publication-form.component.html',
  styleUrls: ['./publication-form.component.scss'],
})
export class PublicationFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private publicationService: PublicationService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.form = new FormGroup({
      type: new FormControl(null, [Validators.required]),
      titre: new FormControl(null, [Validators.required]),
      lien: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      sourcepdf: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.publicationService
        .getPublicationById(id)
        .subscribe((p: Publication) => {
          this.editForm(p);
        });
    }
  }

  editForm(p: Publication): void {
    this.form.patchValue({
      type: p.type,
      titre: p.titre,
      lien: p.lien,
      date: p.date,
      sourcepdf: p.sourcepdf,
    });
  }

  submit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      const updatedPublication = {
        ...this.form.value,
        updatedDate: new Date().toISOString(),
      };
      this.publicationService
        .updatePublication(id, updatedPublication)
        .subscribe(() => {
          this.router.navigate(['ui-components/publications']);
        });
    } else {
      const newPublication = {
        ...this.form.value,
        createdDate: new Date().toISOString(),
      };
      this.publicationService
        .createPublication(newPublication)
        .subscribe(() => {
          this.router.navigate(['ui-components/publications']);
        });
    }
  }
}
