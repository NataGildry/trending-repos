import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'shared-badge',
  template: `<span
    class="block px-2 py-1 bg-white rounded-md shadow border border-gray-200 text-center leading-snug break-words"
  >
    {{ label() }}: {{ value() }}
  </span>`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent {
  public readonly value = input.required<string | null>();
  public readonly label = input.required<string>();
}
