import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from '../model/Event';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private baseUrl: string = 'http://localhost:3001/events';

  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.baseUrl);
  }

  getEventByID(id: string): Observable<Event> {
    return this.http.get<Event>(`${this.baseUrl}/${id}`);
  }

  addEvent(e: Event): Observable<void> {
    return this.http.post<void>(this.baseUrl, e);
  }

  deleteEvent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  updateEvent(id: string, m: Event): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, m);
  }
}
