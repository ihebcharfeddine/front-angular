import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Member } from '../model/Member';
import { Membre_Event } from 'src/model/Member_Event';
import { Membre_Outil } from 'src/model/Membre_Outil';
import { Membre_Publication } from 'src/model/Membre_Publication';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  students: Member[] = [];
  teachers: Member[] = [];

  private baseUrl: string = 'http://localhost:9000/MEMBRE-SERVICE/membres';
  constructor(private httpClient: HttpClient) {}

  // Get all members
  getAllMembers(): Observable<Member[]> {
    return this.httpClient.get<Member[]>(`${this.baseUrl}`);
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

  // Get a full member by ID
  getFullMember(id: number): Observable<Member> {
    return this.httpClient.get<Member>(
      `http://localhost:9000/MEMBRE-SERVICE/fullmember/${id}`
    );
  }

  SaveEtudiant(etudiant: Member): Observable<void> {
    return this.httpClient.post<void>(`${this.baseUrl}/etudiant`, etudiant);
  }

  SaveEnseignant(enseignant: Member): Observable<void> {
    return this.httpClient.post<void>(`${this.baseUrl}/enseignant`, enseignant);
  }

  updateEtudiant(id: string, etudiant: Member): Observable<Member> {
    return this.httpClient.put<Member>(
      `${this.baseUrl}/etudiant/${id}`,
      etudiant
    );
  }

  updateEnseignant(id: string, enseignant: Member): Observable<Member> {
    return this.httpClient.put<Member>(
      `${this.baseUrl}/enseignant/${id}`,
      enseignant
    );
  }

    // Function to get the number of students
    getNumberOfStudents(): Observable<number> {
      return this.getAllStudents().pipe(
        map((students) => students.length)
      );
    }
  
    // Function to get the number of teachers
    getNumberOfTeachers(): Observable<number> {
      return this.getAllTeachers().pipe(
        map((teachers) => teachers.length)
      );
    }
    
  getMemberByid(id: string): Observable<Member> {
    return this.httpClient.get<Member>(`${this.baseUrl}/${id}`);
  }

  deleteMemberByid(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }

  affecterOutil(memberOutil: Membre_Outil): Observable<void> {
    return this.httpClient.post<void>(
      'http://localhost:9000/MEMBRE-SERVICE/outil',
      memberOutil
    );
  }

  affecterPublication(memberPublication: Membre_Publication): Observable<void> {
    return this.httpClient.post<void>(
      `http://localhost:9000/MEMBRE-SERVICE/publication`,
      memberPublication
    );
  }

  affecterEvent(memberEvent: Membre_Event): Observable<void> {
    return this.httpClient.post<void>(
      `http://localhost:9000/MEMBRE-SERVICE/event`,
      memberEvent
    );
  }

    // get the distribution of students by their diplomas
    getStudentDistributionByDiploma(): Observable<any> {
      return this.getAllStudents().pipe(
        map((students) => {
          const distribution: { [key: string]: number } = {}; 

          students.forEach((student) => {
            if (student.diplome) {
              const diploma = student.diplome as string;  
              distribution[diploma] = (distribution[diploma] || 0) + 1;
            }
          });

          return distribution;
        })
      );
    }
  
  getStudentsByTitle(titre: string): Observable<Member[]> {
    return this.getAllStudents().pipe(
      map((members) =>
        members.filter((student) =>
          student.nom.toLowerCase().includes(titre.toLowerCase())
        )
      )
    );
  }

  getTeachersByTitle(titre: string): Observable<Member[]> {
    return this.getAllTeachers().pipe(
      map((members) =>
        members.filter((teacher) =>
          teacher.nom.toLowerCase().includes(titre.toLowerCase())
        )
      )
    );
  }
  tabpub: number[] = [];

  async getNbStudByTeacher() {
    var teacher = await this.httpClient
      .get<Member[]>(`${this.baseUrl}/search/enseignant`)
      .toPromise();
    var student = await this.httpClient
      .get<Member[]>(`${this.baseUrl}/search/etudiant`)
      .toPromise();
    var tabStudent: number[] = [];
    var count = 0;
    if (teacher) {
      tabStudent.push(teacher.length - count);
    }
    if (student) {
      tabStudent.push(student.length - count);
    }
    return tabStudent;
  }
}
