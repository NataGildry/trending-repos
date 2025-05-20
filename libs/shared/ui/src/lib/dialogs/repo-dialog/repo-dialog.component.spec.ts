import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/angular';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { RepoCard } from '../../repo-card/repo-card.component';
import { RepoDialogComponent } from './repo-dialog.component';

describe('RepoDialogComponent', () => {
  const mockRepo: RepoCard = {
    id: 1,
    name: 'TestRepo',
    description: 'This is a test repository',
    html_url: 'https://test',
    stargazers_count: 1234,
    open_issues_count: 45,
    owner: {
      login: 'testuser',
      avatar_url: 'https://test',
    },
  };

  it('should render description, stars, and issues', async () => {
    await render(RepoDialogComponent, {
      providers: [
        {
          provide: DynamicDialogConfig,
          useValue: { data: { repo: mockRepo } },
        },
        {
          provide: DynamicDialogRef,
          useValue: {},
        },
      ],
    });

    expect(screen.getByText(/This is a test repository/i)).toBeInTheDocument();
    expect(screen.getByText(/⭐ Stars: 1,234/)).toBeInTheDocument();
    expect(screen.getByText(/🐛 Issues: 45/)).toBeInTheDocument();
  });

  it('should display the owner login and avatar', async () => {
    await render(RepoDialogComponent, {
      providers: [
        {
          provide: DynamicDialogConfig,
          useValue: { data: { repo: mockRepo } },
        },
        {
          provide: DynamicDialogRef,
          useValue: {},
        },
      ],
    });

    expect(screen.getByAltText(/testuser avatar/i)).toBeInTheDocument();
    const avatar = screen.getByAltText(/testuser avatar/i);
    expect(avatar).toHaveAttribute('src', mockRepo.owner.avatar_url);
  });

  it('should make repo URL visible as a link', async () => {
    await render(RepoDialogComponent, {
      providers: [
        {
          provide: DynamicDialogConfig,
          useValue: { data: { repo: mockRepo } },
        },
        {
          provide: DynamicDialogRef,
          useValue: {},
        },
      ],
    });

    const link = screen.getAllByRole('link').find((a) => a.textContent?.includes(mockRepo.html_url));
    expect(link).toBeInTheDocument();
  });
});
