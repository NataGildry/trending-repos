import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@trending-repos/shared/utils';
import { BehaviorSubject, map, Observable } from 'rxjs';

import { GithubSearchResponse, GithubSearchResponseSchema } from '../models';

const apiUrlsConst = {
  REPO_SEARCH: 'search/repositories',
};

export type RepoFilters = {
  currentPage?: number;
  pageSize?: number;
  search?: string;
  createdAfter: Date;
};

@Injectable({
  providedIn: 'root',
})
export class GithubApiService extends ApiService {
  public readonly repoUpdate$$ = new BehaviorSubject<void>(void 0);

  public fetchRepos(filters?: RepoFilters): Observable<GithubSearchResponse> {
    const defaultStartDate = new Date();
    defaultStartDate.setDate(defaultStartDate.getDate() - 30);

    const createdAfter = filters?.createdAfter ?? defaultStartDate;
    const date = createdAfter.toISOString().split('T')[0]; // YYYY-MM-DD

    const search = filters?.search?.trim() || '';
    const query = `created:>${date} ${search}`.trim();

    let params = new HttpParams().set('q', query).set('sort', 'stars').set('order', 'desc');

    if (filters?.currentPage) {
      params = params.set('page', filters.currentPage.toString());
    }

    if (filters?.pageSize) {
      params = params.set('per_page', filters.pageSize.toString());
    }

    return this.http
      .get<unknown>(this.url(apiUrlsConst.REPO_SEARCH), { params })
      .pipe(map((response) => GithubSearchResponseSchema.parse(response)));
  }
}
