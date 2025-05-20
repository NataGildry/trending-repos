import { render, screen } from '@testing-library/angular';

import { ProgressSpinnerComponent } from './progress-spinner.component';

describe('ProgressSpinnerComponent', () => {
  it('should render the progress spinner with the provided ARIA label', async () => {
    const ariaLabelValue = 'Loading, please wait';
    await render(ProgressSpinnerComponent, {
      inputs: { ariaLabel: ariaLabelValue },
    });

    const progressSpinnerElement = screen.getByRole('progressbar');
    expect(progressSpinnerElement).toHaveAttribute('aria-label', ariaLabelValue);
  });
});
