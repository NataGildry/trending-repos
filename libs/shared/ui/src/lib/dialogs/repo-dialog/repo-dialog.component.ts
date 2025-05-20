import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { take, tap } from 'rxjs';

import { BadgeComponent } from '../../badge/badge.component';
import { StarRatingComponent } from '../../form';

@Component({
  selector: 'shared-repo-dialog',
  imports: [NgOptimizedImage, StarRatingComponent, ReactiveFormsModule, BadgeComponent],
  templateUrl: './repo-dialog.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepoDialogComponent {
  protected readonly config = inject(DynamicDialogConfig);
  protected readonly ref = inject(DynamicDialogRef);
  protected readonly ratingControl = new FormControl(0);

  public constructor() {
    this.ratingControl.valueChanges
      .pipe(
        take(1),
        tap(() => this.ref.close(this.ratingControl.value ?? 0))
      )
      .subscribe();
  }
}
