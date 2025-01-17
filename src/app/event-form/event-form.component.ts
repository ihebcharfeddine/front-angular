import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EventService } from '../services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';
import { Event } from '../model/Event';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, RouterModule],
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
})
export class EventFormComponent implements OnInit {
  eventForm: FormGroup;

  constructor(
    private eventService: EventService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    // Initialize the form in the constructor
    this.eventForm = new FormGroup({
      titre: new FormControl(null, [Validators.required]),
      lieu: new FormControl(null),
      datedebut: new FormControl(null, [Validators.required]),
      datefin: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    const idCourant = this.activatedRoute.snapshot.params['id'];
    console.log(idCourant);
    if (!!idCourant) {
      this.eventService.getEventByID(idCourant).subscribe((event: Event) => {
        this.editForm(event);
      });
    }
  }

  editForm(event: Event): void {
    // Use patchValue to update the form controls
    this.eventForm.patchValue({
      titre: event.titre,
      lieu: event.lieu,
      datedebut: event.datedebut,
      datefin: event.datefin,
    });
  }

  // Submit form data
  onSubmit(): void {
    const idCourant = this.activatedRoute.snapshot.params['id'];
    if (!!idCourant) {
      const eventData = {
        ...this.eventForm.value,
        updatedDate: new Date().toISOString(),
      };
      this.eventService.updateEvent(idCourant, eventData).subscribe(() => {
        this.router.navigate(['ui-components/events']);
      });
    } else {
      const formData = {
        ...this.eventForm.value,
        createdDate: new Date().toISOString(),
      };
      this.eventService.addEvent(formData).subscribe(() => {
        this.router.navigate(['ui-components/events']);
      });
    }
  }
}
