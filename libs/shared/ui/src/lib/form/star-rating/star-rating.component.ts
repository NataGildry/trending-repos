import { Component, forwardRef, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'shared-star-rating',
  template: `
    <div
      aria-valuemax="5"
      aria-valuemin="1"
      class="inline-flex select-none text-3xl cursor-pointer"
      role="slider"
      tabindex="0"
      [attr.aria-valuenow]="value()"
      (blur)="onBlur()"
      (keydown)="onKeydown($event)"
      (mouseleave)="hoverValue.set(0)"
    >
      @for (_ of [].constructor(5); track $index) {
      <span
        class="px-0.5"
        role="button"
        tabindex="-1"
        [attr.aria-label]="'Set rating to ' + ($index + 1) + ' stars'"
        [class.text-gray-300]="$index >= (hoverValue() > 0 ? hoverValue() : value())"
        [class.text-yellow-400]="$index < (hoverValue() > 0 ? hoverValue() : value())"
        (click)="updateValue($index + 1)"
        (keydown.enter)="updateValue($index + 1)"
        (keydown.space)="updateValue($index + 1)"
        (mouseenter)="hoverValue.set($index + 1)"
      >
        ★
      </span>
      }
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StarRatingComponent),
      multi: true,
    },
  ],
  standalone: true,
})
export class StarRatingComponent implements ControlValueAccessor {
  protected readonly value = signal<number>(0);
  protected readonly hoverValue = signal(0);
  protected readonly isDisabled = signal(false);

  private onChange?: (value: number) => void;
  private onTouched?: () => void;

  protected updateValue(value: number): void {
    this.value.set(value);
    this.onChange?.(value);
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowRight' && this.value() < 5) {
      this.updateValue(this.value() + 1);
      event.preventDefault();
    } else if (event.key === 'ArrowLeft' && this.value() > 1) {
      this.updateValue(this.value() - 1);
      event.preventDefault();
    }
  }

  public writeValue(value: number): void {
    this.value.set(value);
  }

  public registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  protected onBlur(): void {
    this.onTouched?.();
  }

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }
}
