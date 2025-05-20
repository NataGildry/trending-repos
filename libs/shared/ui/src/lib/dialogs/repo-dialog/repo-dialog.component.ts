import { DecimalPipe, NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'shared-repo-dialog',
  imports: [DecimalPipe, NgOptimizedImage],
  templateUrl: './repo-dialog.component.html',
  standalone: true,
})
export class RepoDialogComponent {
  protected readonly config = inject(DynamicDialogConfig);
}
