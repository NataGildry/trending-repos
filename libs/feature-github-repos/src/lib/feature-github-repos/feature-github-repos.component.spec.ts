import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureGithubReposComponent } from './feature-github-repos.component';

describe('FeatureGithubReposComponent', () => {
  let component: FeatureGithubReposComponent;
  let fixture: ComponentFixture<FeatureGithubReposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureGithubReposComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureGithubReposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
