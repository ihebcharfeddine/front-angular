import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from '../model/Event';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private baseUrl: string = 'http://localhost:9000/EVENT-SERVICE/events';

  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.baseUrl);
  }

  getEventByID(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.baseUrl}/${id}`);
  }

  addEvent(event: Event): Observable<void> {
    return this.http.post<void>(this.baseUrl, event);
  }

  deleteEvent(id: number): Observable<void> {
    console.log('Making DELETE request for event ID:', id);
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  updateEvent(id: number, event: Event): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, event);
  }

  getEventsByTitle(title: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.baseUrl}/${title}`);
  }
}
