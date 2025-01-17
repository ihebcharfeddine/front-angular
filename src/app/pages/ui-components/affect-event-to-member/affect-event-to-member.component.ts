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
import { Membre_Event } from 'src/model/Member_Event';
import { EventService } from 'src/services/event.service';
import { Event } from 'src/model/Event';
import { Membre_Publication } from 'src/model/Membre_Publication';

@Component({
  selector: 'app-affect-tool-to-member',
  templateUrl: './affect-event-to-member.component.html',
  styleUrls: ['./affect-event-to-member.component.scss'],
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule, RouterModule],
})
export class AffectEventToMemberComponent {
  form!: FormGroup;
  dataMembers: Member[] = [];
  dataEvents: Event[] = [];

  constructor(
    private memberService: MemberService,
    private eventService: EventService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.fetchData();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      eventId: new FormControl(null),
      memberId: new FormControl(null),
    });
  }

  fetchData(): void {
    this.memberService.getAllMembers().subscribe((members) => {
      this.dataMembers = members;
    });

    this.eventService.getAllEvents().subscribe((events) => {
      this.dataEvents = events;
    });
  }

  save(): void {
    if (this.form.valid) {
      const memberId = this.form.value.memberId;
      const eventId = this.form.value.eventId;

      const memberEvent: Membre_Event = {
        participant_id: memberId,
        event_id: eventId,
      };

      console.log('Payload:', memberEvent);

      this.memberService.affecterEvent(memberEvent).subscribe(
        () => {
          console.log('Event affected to auteur successfully!');
          this.router.navigate(['/ui-components/events']);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }
  }

  close(): void {
    this.router.navigate(['/ui-components/events']).then(() => {
      console.log('Navigated back to Events page');
    });
  }
}
