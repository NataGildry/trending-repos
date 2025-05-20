import { DecimalPipe } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'shared-badge',
  imports: [DecimalPipe],
  template: ` <span class="px-2 py-1 bg-white rounded-md shadow border border-gray-200">
    {{ label() }}: {{ value() | number }}
  </span>`,
  standalone: true,
})
export class BadgeComponent {
  public readonly value = input.required<number>();
  public readonly label = input.required<string>();
}
