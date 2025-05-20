import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'shared-progress-spinner',
  standalone: true,
  imports: [ProgressSpinnerModule],
  templateUrl: './progress-spinner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressSpinnerComponent {
  public readonly ariaLabel = input<string>();
}
