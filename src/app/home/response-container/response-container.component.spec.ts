import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ResponseContainerComponent } from './response-container.component';
import { RepoBlockComponent } from './repo-block/repo-block.component';
import { NO_RESULTS_FOUND, SUCCESSFUL_API_RESP } from 'src/app/mock-data/mock-repos';

describe('ResponseContainerComponent', () => {
  let component: ResponseContainerComponent;
  let fixture: ComponentFixture<ResponseContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ResponseContainerComponent,
        RepoBlockComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseContainerComponent);
    component = fixture.componentInstance;
    component.results = null;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should indicate that "no results found" within the component', () => {
    const compiled = fixture.debugElement;
    component.results = NO_RESULTS_FOUND;
    component.ngOnInit();
    expect(component.noResults).toBeTruthy();
  });

  it('Should populate the "no results found" error block', () => {
    const compiled = fixture.debugElement;
    component.results = NO_RESULTS_FOUND;
    component.ngOnInit();
    expect(component.noResults).toBeTruthy();
    const errorBox = compiled.query(By.css('.ui.negative.message')).nativeElement;

    expect(errorBox.textContent).toContain("No Results Found");
  });

  it('Should populate the repo block after successful API response', () => {
    const compiled = fixture.debugElement;
    component.results = SUCCESSFUL_API_RESP;
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.results).toBeTruthy();
  });
});
