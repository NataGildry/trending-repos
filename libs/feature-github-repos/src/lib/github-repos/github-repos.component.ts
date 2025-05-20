import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  DynamicDialogService,
  ProgressSpinnerComponent,
  RepoCard,
  RepoCardComponent,
  RepoDialogComponent,
} from '@trending-repos/shared/ui';
import { LocalStorageService } from '@trending-repos/shared/utils';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { BehaviorSubject, combineLatest, finalize, map, take, tap } from 'rxjs';

import { GithubApiService, RepoFilters } from '../api/github-api.service';
import { GithubRepo } from '../models';

type LoadingStatus = 'none' | 'loading' | 'appending';
type RatedRepo = GithubRepo & { rate: number };

@Component({
  selector: 'tr-github-repos',
  imports: [AsyncPipe, ProgressSpinnerComponent, RepoCardComponent, InfiniteScrollDirective],
  templateUrl: './github-repos.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GithubReposComponent {
  private readonly api = inject(GithubApiService);
  private readonly dialogService = inject(DynamicDialogService);
  private readonly localStorageService = inject(LocalStorageService);
  private readonly loadingStatus$$ = new BehaviorSubject<LoadingStatus>('none');
  private readonly repos$$ = new BehaviorSubject<RatedRepo[]>([]);
  private readonly RATINGS_KEY = 'repoRatings';

  protected readonly filters = signal<RepoFilters>({
    currentPage: 1,
    pageSize: 30,
  });

  protected readonly loadingStatus$ = this.loadingStatus$$.asObservable();
  protected readonly viewModel$ = combineLatest([this.repos$$.asObservable(), this.loadingStatus$]).pipe(
    map(([repos, loadingStatus]: [RatedRepo[], LoadingStatus]) => ({
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
          const allRatings = this.localStorageService.getItem<Record<number, number>>('repoRatings') ?? {};

          const updatedRepos = response.items.map((repo) => ({
            ...repo,
            rate: allRatings[repo.id] ?? 0,
          }));

          this.repos$$.next([...(append ? this.repos$$.value : []), ...updatedRepos]);
        }),
        finalize(() => this.loadingStatus$$.next('none'))
      )
      .subscribe();
  }

  protected onRepoSelected(repo: RepoCard): void {
    const dialogRef = this.dialogService.show(
      RepoDialogComponent,
      { repo },
      {
        header: `⭐ Rate Repository: ${repo.name}`,
        width: '50%',
        contentStyle: { 'max-height': '90vh' },
        baseZIndex: 10000,
        closable: true,
        dismissableMask: true,
        modal: true,
      }
    );

    dialogRef.onClose
      .pipe(
        take(1),
        tap((rating: number | undefined) => {
          if (!rating) {
            return;
          }

          const currentRatings = this.localStorageService.getItem<Record<number, number>>(this.RATINGS_KEY) ?? {};
          const updatedRatings = { ...currentRatings, [repo.id]: rating };
          const updatedRepos = this.repos$$.value.map((r) => (r.id === repo.id ? { ...r, rate: rating } : r));

          this.localStorageService.setItem(this.RATINGS_KEY, updatedRatings);
          this.repos$$.next(updatedRepos);
        })
      )
      .subscribe();
  }
}
