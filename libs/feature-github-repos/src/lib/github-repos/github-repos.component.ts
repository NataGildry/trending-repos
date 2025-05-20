import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ProgressSpinnerComponent, RepoCardComponent } from '@trending-repos/shared/ui';
import { Observable, startWith, switchMap } from 'rxjs';

import { GithubApiService } from '../api/github-api.service';
import { GithubSearchResponse } from '../models';

@Component({
  selector: 'tr-github-repos',
  imports: [AsyncPipe, ProgressSpinnerComponent, RepoCardComponent],
  templateUrl: './github-repos.component.html',
  standalone: true,
})
export class GithubReposComponent {
  private readonly api = inject(GithubApiService);
  private readonly updateTrigger$ = this.api.repoUpdate$$;

  protected readonly repos$: Observable<GithubSearchResponse | 'loading'> = this.updateTrigger$.pipe(
    switchMap(() => this.api.fetchRepos()),
    startWith('loading' as const)
  );
}
