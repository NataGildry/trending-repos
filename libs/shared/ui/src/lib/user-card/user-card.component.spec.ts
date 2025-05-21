import { render, screen } from '@testing-library/angular';

import { UserCardComponent } from './user-card.component';

describe('UserCardComponent', () => {
  const mockUser = {
    login: 'nataliia',
    avatar_url: 'https://example.com/avatar.jpg',
  };

  it('should render the user avatar with correct alt text and src', async () => {
    await render(UserCardComponent, {
      inputs: { user: mockUser },
    });

    const image = screen.getByRole('img');

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('alt', 'nataliia avatar');
    expect(image).toHaveAttribute('src', expect.stringContaining(mockUser.avatar_url));
  });

  it('should render the user login in heading', async () => {
    await render(UserCardComponent, {
      inputs: { user: mockUser },
    });

    expect(screen.getByRole('heading', { name: /nataliia/i })).toBeInTheDocument();
  });
});
