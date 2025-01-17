import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EventService } from '../../services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';
import { Event } from '../../model/Event';
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
    this.eventForm = new FormGroup({
      titre: new FormControl(null, [Validators.required]),
      lieu: new FormControl(null),
      date: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.eventService.getEventByID(id).subscribe((event: Event) => {
        this.eventForm.patchValue(event);
      });
    }
  }

  onSubmit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    const eventData = this.eventForm.value;

    if (id) {
      this.eventService.updateEvent(id, eventData).subscribe(() => {
        this.router.navigate(['ui-components/events']);
      });
    } else {
      this.eventService.addEvent(eventData).subscribe(() => {
        this.router.navigate(['ui-components/events']);
      });
    }
  }
}
