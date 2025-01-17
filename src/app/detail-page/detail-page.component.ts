import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from 'src/model/Member';
import { Publication } from 'src/model/Publication';
import { Tool } from 'src/model/Tool';
import { Event } from 'src/model/Event'; // Ensure this is correctly imported
import { MemberService } from 'src/services/member.service';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-full-member',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss'],
  imports: [MatTableModule, MatCardModule, MatExpansionModule],
  standalone: true,
})
export class DetailPageComponent implements OnInit {
  displayedColumnsTools: string[] = ['id', 'Date', 'Source'];
  dataTool!: Tool[];
  dataTool2 = new MatTableDataSource<Tool>(this.dataTool);

  displayedColumnsEvent: string[] = [
    'id',
    'titre',
    'DateDebut',
    'DateFin',
    'lieu',
  ];
  dataEvent!: Event[];
  dataEvent2 = new MatTableDataSource<Event>(this.dataEvent);

  displayedColumnsArticle: string[] = [
    'id',
    'titre',
    'Date',
    'type',
    'sourcePdf',
  ];
  dataArticle!: Publication[];
  dataArticle2 = new MatTableDataSource<Publication>(this.dataArticle);

  dataSource!: Member;

  constructor(
    private MS: MemberService,

    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idcourant = this.activatedRoute.snapshot.params['id'];
    if (!!idcourant) {
      this.fetch(idcourant);
    }
  }

  fetch(id: number): void {
    this.MS.getFullMember(id).subscribe((tab) => {
      this.dataSource = tab;

      if (tab.outils) {
        this.dataTool2 = new MatTableDataSource(tab.outils);
      }
      if (tab.events) {
        this.dataEvent2 = new MatTableDataSource(tab.events);
      }
      if (tab.pubs) {
        this.dataArticle2 = new MatTableDataSource(tab.pubs);
      }
    });
  }
}
