import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/angular';

import { RepoCard, RepoCardComponent } from './repo-card.component';

describe('RepoCardComponent', () => {
  const mockRepo: RepoCard = {
    id: 1,
    name: 'TestRepo',
    description: 'This is a test repository',
    html_url: 'https://test',
    stargazers_count: 1234,
    open_issues_count: 45,
    rate: 5,
    created_at: '2023-01-01T00:00:00Z',
    owner: {
      login: 'testuser',
      avatar_url: 'https://test',
    },
  };

  it('should render description', async () => {
    await render(RepoCardComponent, {
      inputs: { repo: mockRepo },
    });

    expect(screen.getByText(/This is a test repository/i)).toBeInTheDocument();
  });

  it('should display the owner login and avatar', async () => {
    await render(RepoCardComponent, {
      inputs: { repo: mockRepo },
    });

    expect(screen.getByAltText(/testuser avatar/i)).toBeInTheDocument();
    const avatar = screen.getByAltText(/testuser avatar/i);
    expect(avatar).toHaveAttribute('src', mockRepo.owner.avatar_url);
  });

  it('should make repo URL visible as a link', async () => {
    await render(RepoCardComponent, {
      inputs: { repo: mockRepo },
    });

    const link = screen.getAllByRole('link').find((a) => a.textContent?.includes(mockRepo.html_url));
    expect(link).toBeInTheDocument();
  });
});
