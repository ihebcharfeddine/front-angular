import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Member } from '../model/Member';
import { Membre_Event } from 'src/model/Member_Event';
import { Membre_Article } from 'src/model/Member_Article';
import { Membre_Tool } from 'src/model/Member_Tool';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private baseUrl: string = 'http://localhost:9000/MEMBRE-SERVICE/membres';
  students: Member[] = [];
  teachers: Member[] = [];

  constructor(private http: HttpClient) {}

  // Get all members
  getAllMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(`${this.baseUrl}`);
  }

  // Get a full member by ID
  getFullMember(id: number): Observable<Member> {
    return this.http.get<Member>(`${this.baseUrl}/fullmember/${id}`);
  }

  // Get all teachers
  getAllTeachers(): Observable<Member[]> {
    return this.getAllMembers().pipe(
      map((members) => members.filter((member) => member.grade))
    );
  }

  // Get all students
  getAllStudents(): Observable<Member[]> {
    return this.getAllMembers().pipe(
      map((members) => members.filter((member) => member.diplome))
    );
  }

  // Get a member by ID
  getMemberByID(id: number): Observable<Member> {
    return this.http.get<Member>(`${this.baseUrl}/${id}`);
  }

  // Delete a member by ID
  deleteMember(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Save a student
  SaveEtudiant(etudiant: Member): Observable<void> {
    return this.http.post<void>(this.baseUrl, etudiant);
  }

  // Save a teacher
  SaveEnseignant(enseignant: Member): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}`, enseignant);
  }

  // Affect an outil to a member
  affecterOutil(memberOutil: Membre_Tool): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/outil`, memberOutil);
  }

  // Affect an article to a member
  affecterArticle(memberArticle: Membre_Article): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/publication`, memberArticle);
  }

  // Affect an event to a member
  affecterEvent(memberEvent: Membre_Event): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/evenement`, memberEvent);
  }

  // Get the number of students by teacher (async/await example)
  async getNbStudByTeacher(): Promise<number[]> {
    const teachers = await this.http
      .get<Member[]>(`${this.baseUrl}/enseignant`)
      .toPromise();
    const students = await this.http
      .get<Member[]>(`${this.baseUrl}/etudiant`)
      .toPromise();
    const tabStudent: number[] = [];
    let count = 0;

    if (teachers) {
      tabStudent.push(teachers.length - count);
    }
    if (students) {
      tabStudent.push(students.length - count);
    }

    return tabStudent;
  }

  // Add a new member
  add(m: Member): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/membre`, m);
  }

  // Update a member
  updateMember(id: string, m: Member): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, m);
  }
}
