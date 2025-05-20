import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ProgressSpinnerComponent, RepoCardComponent } from '@trending-repos/shared/ui';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { BehaviorSubject, combineLatest, finalize, map, take, tap } from 'rxjs';

import { GithubApiService, RepoFilters } from '../api/github-api.service';
import { GithubRepo } from '../models';

type LoadingStatus = 'none' | 'loading' | 'appending';

@Component({
  selector: 'tr-github-repos',
  imports: [AsyncPipe, ProgressSpinnerComponent, RepoCardComponent, InfiniteScrollDirective],
  templateUrl: './github-repos.component.html',
  standalone: true,
})
export class GithubReposComponent {
  private readonly api = inject(GithubApiService);
  private readonly loadingStatus$$ = new BehaviorSubject<LoadingStatus>('none');
  private readonly repos$$ = new BehaviorSubject<GithubRepo[]>([]);
  protected readonly filters = signal<RepoFilters>({
    currentPage: 1,
    pageSize: 30,
  });

  protected readonly loadingStatus$ = this.loadingStatus$$.asObservable();
  protected readonly viewModel$ = combineLatest([this.repos$$.asObservable(), this.loadingStatus$]).pipe(
    map(([repos, loadingStatus]: [GithubRepo[], LoadingStatus]) => ({
      repos,
      loadingStatus,
    }))
  );

  public constructor() {
    this.fetchRepos();
  }

  protected onScroll(): void {
    this.filters.update((filter) => ({
      ...filter,
      currentPage: (filter.currentPage ?? 1) + 1,
    }));
    this.fetchRepos(true);
  }

  private fetchRepos(append: boolean = false): void {
    this.loadingStatus$$.next(append ? 'appending' : 'loading');

    this.api
      .fetchRepos(this.filters())
      .pipe(
        take(1),
        tap((response) => {
          this.repos$$.next([...(append ? this.repos$$.value : []), ...response.items]);
        }),
        finalize(() => this.loadingStatus$$.next('none'))
      )
      .subscribe();
  }
}
