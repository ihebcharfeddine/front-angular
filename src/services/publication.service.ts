import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publication } from '../model/Publication';

@Injectable({
  providedIn: 'root',
})
export class PublicationService {
  private apiUrl = 'http://localhost:3001/publications';

  constructor(private http: HttpClient) {}

  getAllPublications(): Observable<Publication[]> {
    return this.http.get<Publication[]>(this.apiUrl);
  }

  getPublicationById(id: number): Observable<Publication> {
    return this.http.get<Publication>(`${this.apiUrl}/${id}`);
  }

  createPublication(publication: Publication): Observable<Publication> {
    return this.http.post<Publication>(this.apiUrl, publication);
  }

  updatePublication(
    id: number,
    publication: Publication
  ): Observable<Publication> {
    return this.http.put<Publication>(`${this.apiUrl}/${id}`, publication);
  }

  deletePublication(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
