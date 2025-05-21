import { DatePipe, DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { take, tap } from 'rxjs';

import { BadgeComponent } from '../../badge/badge.component';
import { StarRatingComponent } from '../../form';
import { UserCardComponent } from '../../user-card/user-card.component';

type Owner = {
  login: string;
  avatar_url: string;
};

type Repo = {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  open_issues_count: number;
  html_url: string;
  owner: Owner;
  rate: number;
  created_at: string;
};

export interface RepoDialogData {
  repo: Repo;
}

/**
 * Needed to safely access `data.repo` from `DynamicDialogConfig.data`,
 * which is typed as `unknown`. Prevents ESLint `no-unsafe-member-access`
 * and ensures proper type narrowing.
 */
function isRepoDialogData(data: unknown): data is RepoDialogData {
  return typeof data === 'object' && data !== null && 'repo' in data;
}

@Component({
  selector: 'shared-repo-dialog',
  imports: [StarRatingComponent, ReactiveFormsModule, BadgeComponent, UserCardComponent, DatePipe, DecimalPipe],
  templateUrl: './repo-dialog.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepoDialogComponent {
  protected readonly config = inject(DynamicDialogConfig<RepoDialogData>);
  protected readonly ref = inject(DynamicDialogRef);
  protected readonly ratingControl = new FormControl(0);

  public constructor() {
    if (isRepoDialogData(this.config.data)) {
      this.ratingControl.setValue(this.config.data.repo.rate ?? 0, { emitEvent: false });
    }

    this.ratingControl.valueChanges
      .pipe(
        take(1),
        tap(() => this.ref.close(this.ratingControl.value ?? 0))
      )
      .subscribe();
  }
}
