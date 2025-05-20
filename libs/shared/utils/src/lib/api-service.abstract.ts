import { HttpClient } from '@angular/common/http';
import { Directive, inject } from '@angular/core';

@Directive()
export class ApiService {
  protected readonly http = inject(HttpClient);

  protected url(path: string): string {
    return `https://api.github.com/${path}`;
  }
}
