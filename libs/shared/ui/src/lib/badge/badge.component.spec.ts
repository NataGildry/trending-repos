import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/angular';

import { BadgeComponent } from './badge.component';

describe('BadgeComponent', () => {
  it('should render label and value with emoji prefix', async () => {
    await render(BadgeComponent, {
      inputs: {
        label: '⭐ Stars',
        value: 1234,
      },
    });

    expect(screen.getByText('⭐ Stars: 1,234')).toBeInTheDocument();
  });

  it('should render label and value for issues', async () => {
    await render(BadgeComponent, {
      inputs: {
        label: '🐛 Issues',
        value: 45,
      },
    });

    expect(screen.getByText('🐛 Issues: 45')).toBeInTheDocument();
  });
});
