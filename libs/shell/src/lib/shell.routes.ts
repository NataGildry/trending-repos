import { Routes } from '@angular/router';
import ShellComponent from './shell/shell.component';

export const shellRoutes: Routes = [
  {
    path: '',
    loadComponent: () => ShellComponent,
  },
];
