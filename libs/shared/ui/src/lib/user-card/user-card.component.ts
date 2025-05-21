import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type UserCard = {
  login: string;
  avatar_url: string;
};

@Component({
  selector: 'shared-user-card',
  imports: [NgOptimizedImage],
  template: ` <div class="flex flex-col gap-4">
    <img
      class="w-16 h-16 rounded-full object-cover shrink-0"
      height="64"
      width="64"
      [alt]="user().login + ' avatar'"
      [ngSrc]="user().avatar_url"
    />

    <h3 class="text-lg font-semibold text-gray-900 truncate">
      {{ user().login }}
    </h3>
  </div>`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent {
  public readonly user = input.required<UserCard>();
}
