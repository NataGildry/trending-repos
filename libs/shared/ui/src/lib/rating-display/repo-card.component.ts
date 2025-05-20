import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'shared-rating-display',
  standalone: true,
  template: `
    <div class="inline-flex text-3xl text-yellow-400" role="img" [attr.aria-label]="'Star rating: ' + rating()">
      @for (_ of [].constructor(5); track $index) {
      <span class="px-0.5" [class.text-gray-300]="$index >= rating()" [class.text-yellow-400]="$index < rating()">
        ★
      </span>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingDisplayComponent {
  public readonly rating = input.required<number>();
}
