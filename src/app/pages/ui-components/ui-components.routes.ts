import { Routes } from '@angular/router';

// ui
import { AppBadgeComponent } from './badge/badge.component';
import { AppChipsComponent } from './chips/chips.component';
import { AppListsComponent } from './lists/lists.component';
import { AppMenuComponent } from './menu/menu.component';
import { AppTooltipsComponent } from './tooltips/tooltips.component';
import { AppFormsComponent } from './forms/forms.component';
import { AppTablesComponent } from './tables/tables.component';
import { MemberListComponent } from 'src/app/pages/ui-components/students/member-list.component';
import { MemberFormComponent } from 'src/app/member-form/member-form.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventFormComponent } from 'src/app/event-form/event-form.component';
import { ToolListComponent } from './tool-list/tool-list.component';
import { ToolFormComponent } from 'src/app/tool-form/tool-form.component';
import { PublicationListComponent } from 'src/app/pages/ui-components/publication-list/publication-list.component';
import { PublicationFormComponent } from 'src/app/publication-form/publication-form.component';

export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'students',
        component: MemberListComponent,
      },
      {
        path: 'students/create',
        component: MemberFormComponent,
      },
      {
        path: 'students/:id/edit',
        component: MemberFormComponent,
      },
      {
        path: 'events',
        component: EventListComponent,
      },
      {
        path: 'events/create',
        component: EventFormComponent,
      },
      {
        path: 'events/:id/edit',
        component: EventFormComponent,
      },
      {
        path: 'tools',
        component: ToolListComponent,
      },
      {
        path: 'tools/create',
        component: ToolFormComponent,
      },
      {
        path: 'tools/:id/edit',
        component: ToolFormComponent,
      },
      {
        path: 'publications',
        component: PublicationListComponent,
      },
      {
        path: 'publications/create',
        component: PublicationFormComponent,
      },
      {
        path: 'publications/:id/edit',
        component: PublicationFormComponent,
      },
      {
        path: 'badge',
        component: AppBadgeComponent,
      },
      {
        path: 'chips',
        component: AppChipsComponent,
      },
      {
        path: 'lists',
        component: AppListsComponent,
      },
      {
        path: 'menu',
        component: AppMenuComponent,
      },
      {
        path: 'tooltips',
        component: AppTooltipsComponent,
      },
      {
        path: 'forms',
        component: AppFormsComponent,
      },
      {
        path: 'tables',
        component: AppTablesComponent,
      },
    ],
  },
];
