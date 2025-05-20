import { DecimalPipe, NgOptimizedImage } from '@angular/common';
import { Component, input, output } from '@angular/core';

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
};

@Component({
  selector: 'shared-repo-card',
  imports: [DecimalPipe, NgOptimizedImage],
  templateUrl: './repo-card.component.html',
  standalone: true,
})
export class RepoCardComponent {
  public readonly repo = input.required<RepoCard>();
  public readonly repoSelected = output<RepoCard>();
}
