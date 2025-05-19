import { Route } from '@angular/router';
import { NotFoundPageComponent } from './not-found-page.component';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () => import('@trending-repos/shell').then((m) => m.shellRoutes),
  },
  {
    path: 'not-found',
    component: NotFoundPageComponent,
  },
  {
    path: '**',
    redirectTo: '/not-found',
  },
];
