import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from '../model/Member';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private baseUrl: string = 'http://localhost:3001/members';

  constructor(private http: HttpClient) {}

  getAllMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.baseUrl);
  }

  getMemberByID(id: string): Observable<Member> {
    return this.http.get<Member>(`${this.baseUrl}/${id}`);
  }

  add(m: Member): Observable<void> {
    return this.http.post<void>(this.baseUrl, m);
  }

  deleteMember(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  updateMember(id: string, m: Member): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, m);
  }
}
