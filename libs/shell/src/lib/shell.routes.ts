import { Routes } from '@angular/router';
import { featureGithubReposRoutes } from '@trending-repos/feature-github-repos';

export const shellRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./shell/shell.component'),
    children: [...featureGithubReposRoutes],
  },
];
