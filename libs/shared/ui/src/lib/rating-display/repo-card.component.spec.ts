import { render, screen } from '@testing-library/angular';

import { RatingDisplayComponent } from './repo-card.component';

describe('ReadOnlyStarRatingComponent', () => {
  it('should render 5 stars total', async () => {
    await render(RatingDisplayComponent, {
      inputs: { rating: 3 },
    });

    const stars = screen.getAllByText('★');
    expect(stars).toHaveLength(5);
  });

  it('should highlight the correct number of stars', async () => {
    await render(RatingDisplayComponent, {
      inputs: { rating: 3 },
    });

    const stars = screen.getAllByText('★');

    stars.forEach((star, index) => {
      if (index < 3) {
        expect(star).toHaveClass('text-yellow-400');
      } else {
        expect(star).toHaveClass('text-gray-300');
      }
    });
  });

  it('should show correct aria-label', async () => {
    await render(RatingDisplayComponent, {
      inputs: { rating: 4 },
    });

    expect(screen.getByRole('img')).toHaveAttribute('aria-label', 'Star rating: 4');
  });
});
