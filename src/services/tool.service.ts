import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Tool } from '../model/Tool';

@Injectable({
  providedIn: 'root',
})
export class ToolService {
  private apiUrl = 'http://localhost:9000/OUTIL-SERVICE/outils';

  constructor(private http: HttpClient) {}

  getAllTools(): Observable<Tool[]> {
    return this.http.get<Tool[]>(this.apiUrl);
  }

  getToolById(id: number): Observable<Tool> {
    return this.http.get<Tool>(`${this.apiUrl}/${id}`);
  }

  deleteTool(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addTool(tool: Tool): Observable<Tool> {
    return this.http.post<Tool>(this.apiUrl, tool);
  }

  updateTool(id: number, tool: Tool): Observable<Tool> {
    return this.http.put<Tool>(`${this.apiUrl}/${id}`, tool);
  }
}
