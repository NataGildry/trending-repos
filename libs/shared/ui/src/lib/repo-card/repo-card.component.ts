import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { BadgeComponent } from '../badge/badge.component';
import { RatingDisplayComponent } from '../rating-display/repo-card.component';

type RepoOwner = {
  login: string;
  avatar_url: string;
};

export type RepoCard = {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  open_issues_count: number;
  html_url: string;
  owner: RepoOwner;
  rate: number;
};

@Component({
  selector: 'shared-repo-card',
  imports: [NgOptimizedImage, BadgeComponent, RatingDisplayComponent],
  templateUrl: './repo-card.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepoCardComponent {
  public readonly repo = input.required<RepoCard>();
  public readonly repoSelected = output<RepoCard>();
}
