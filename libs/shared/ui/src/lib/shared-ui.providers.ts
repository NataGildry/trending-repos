import { EnvironmentProviders, Provider } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';

/**
 * Returns the set of domain specific dependency-injection providers.
 */
export function provideSharedUiDomain(): (Provider | EnvironmentProviders)[] {
  return [DialogService];
}
