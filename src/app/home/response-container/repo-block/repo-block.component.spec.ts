import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { RepoBlockComponent } from './repo-block.component';
import { SINGLE_REPO_RESP } from 'src/app/mock-data/mock-repos';

describe('RepoBlockComponent', () => {
  let component: RepoBlockComponent;
  let fixture: ComponentFixture<RepoBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepoBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should create a component with a single repo result', () => {
    const compiled = fixture.debugElement;
    component.repo = SINGLE_REPO_RESP;
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.repo).toBeTruthy();
  });

  it('Should have the proper owner name in the repo', () => {
    const compiled = fixture.debugElement;
    component.repo = SINGLE_REPO_RESP;
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.repo.owner.login).toEqual('facebook');
  });

  it('Should create a repo block on the UI with the proper owner populated', () => {
    const compiled = fixture.debugElement;
    component.repo = SINGLE_REPO_RESP;
    component.ngOnInit();
    fixture.detectChanges();
    const metaBlock = compiled.query(By.css('.meta')).nativeElement;
    expect(metaBlock.textContent).toContain('Owner');
  });

  it('Should create a repo block on the UI with the number of forks populated', () => {
    const compiled = fixture.debugElement;
    component.repo = SINGLE_REPO_RESP;
    component.ngOnInit();
    fixture.detectChanges();
    const forksCount = compiled.query(By.css('.blue.statistic')).nativeElement;
    expect(forksCount.textContent).toContain('23986');
  });

  it('Should populate the proper license on the UI', () => {
    const compiled = fixture.debugElement;
    component.repo = SINGLE_REPO_RESP;
    component.ngOnInit();
    fixture.detectChanges();
    const forksCount = compiled.query(By.css('.ui.license.label')).nativeElement;
    expect(forksCount.textContent).toContain('MIT License');
  });

});
