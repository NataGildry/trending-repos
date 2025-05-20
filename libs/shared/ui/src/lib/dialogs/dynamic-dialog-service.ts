import { inject, Injectable, Type } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Injectable({
  providedIn: 'root',
})
export class DynamicDialogService {
  private readonly dialogService = inject(DialogService);

  public show<T, D = unknown>(component: Type<T>, data?: D, config?: Partial<DynamicDialogConfig>): DynamicDialogRef {
    return this.dialogService.open(component, {
      data,
      focusOnShow: false,
      contentStyle: { 'max-height': '80vh', overflow: 'auto' },
      baseZIndex: 10000,
      ...config,
    });
  }
}
