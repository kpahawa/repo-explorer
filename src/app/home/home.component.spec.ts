import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';

import { HomeComponent } from './home.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ResponseContainerComponent } from './response-container/response-container.component';
import { RepoBlockComponent } from './response-container/repo-block/repo-block.component';
import { GitService } from '../service/git.service';
import { HttpService } from '../service/http.service';
import { of, throwError } from 'rxjs';
import { MOCK_API_ERROR, SUCCESSFUL_API_RESP } from '../mock-data/mock-repos';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let gitService: GitService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        ResponseContainerComponent,
        RepoBlockComponent
      ],
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule
      ],
      providers: [
        GitService,
        HttpService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate licenses options', () => {
    component = fixture.componentInstance;
    const compiled = fixture.debugElement;
    const licenseDropdown: HTMLElement = compiled.query(By.css('.ui.license.dropdown')).nativeElement;
    expect(component.licenseOptions.length + 1).toEqual(licenseDropdown.children.length);  
  });

  it('should populate star selection options', () => {
    component = fixture.componentInstance;
    const compiled = fixture.debugElement;
    const starDropdown: HTMLElement = compiled.query(By.css('.ui.star.dropdown')).nativeElement;
    expect(component.options.length).toEqual(starDropdown.children.length);
  });

  it('should have submit button disabled on load', () => {
    component = fixture.componentInstance;
    const compiled = fixture.debugElement;
    const submitButton = compiled.query(By.css('.ui.green.button')).nativeElement;
    expect(submitButton.disabled).toBe(true);
  });

  it('should have submit button disabled on after touching text field', () => {
    component = fixture.componentInstance;
    const compiled = fixture.debugElement;
    const submitButton = compiled.query(By.css('.ui.green.button')).nativeElement;
    const repoTextControl = component.fg.controls['text'];
    repoTextControl.setValue(null);
    expect(submitButton.disabled).toBe(true);
  });

  it('should populate form errors after touching text field', () => {
    component = fixture.componentInstance;
    const repoTextControl = component.fg.controls['text'];
    repoTextControl.setValue(null);
    expect(repoTextControl.errors.required).toBeTruthy();
  });

  it('should populate UI errors after touching text field', () => {
    component = fixture.componentInstance;
    const compiled = fixture.debugElement;
    const repoTextControl = component.fg.controls['text'];
    repoTextControl.markAsTouched();
    fixture.detectChanges();
    const errorBox = compiled.query(By.css('.ui.error.message')).nativeElement;

    expect(errorBox.textContent).toContain('The repository search key is required');
  });

  it('should have enable submit button after entering repo text only', () => {
    component = fixture.componentInstance;
    const compiled = fixture.debugElement;
    const submitButton = compiled.query(By.css('.ui.green.button')).nativeElement;
    const repoTextControl = component.fg.controls['text'];
    repoTextControl.setValue('react');
    fixture.detectChanges();
    expect(submitButton.disabled).toBe(false);
  });

  it('should disable button after not inputting star value', () => {
    component = fixture.componentInstance;
    const compiled = fixture.debugElement;
    const submitButton = compiled.query(By.css('.ui.green.button')).nativeElement;
    const repoTextControl = component.fg.controls['text'];
    component.starOption = '>';
    repoTextControl.setValue('react');
    fixture.detectChanges();

    expect(submitButton.disabled).toBe(true);
  });

  it('should populate form errors after not inputting star value', () => {
    component = fixture.componentInstance;
    const repoTextControl = component.fg.controls['text'];
    component.starOption = '>';
    repoTextControl.setValue('react');
    fixture.detectChanges();

    expect(component.fg.errors.invalidStartingValue).toBeTruthy();
  });

  it('should display specific error message due to no star value', () => {
    component = fixture.componentInstance;
    const compiled = fixture.debugElement;
    const repoTextControl = component.fg.controls['text'];
    component.starOption = '>';
    repoTextControl.setValue('react');
    fixture.detectChanges();
    const errorBox = compiled.query(By.css('.ui.error.message')).nativeElement;

    expect(errorBox.textContent).toContain('Starting value not specified');
  });

  // test incomplete input
  it('should have 2 errors when selecting between for the first time', () => {
    component = fixture.componentInstance;
    const repoTextControl = component.fg.controls['text'];
    component.starOption = 'Between';
    repoTextControl.setValue('react');
    fixture.detectChanges();
    expect(component.fg.errors.invalidStartingValue && component.fg.errors.invalidEndingValue).toBeTruthy();  
  });

  it('should populate 2 errors in error box when selecting between for the first time', () => {
    component = fixture.componentInstance;
    const repoTextControl = component.fg.controls['text'];
    const compiled = fixture.debugElement;
    component.starOption = 'Between';
    repoTextControl.setValue('react');
    fixture.detectChanges();
    const errorBox = compiled.query(By.css('.ui.error.message')).nativeElement;

    expect(errorBox.textContent).toContain('Starting value not specified');
    expect(errorBox.textContent).toContain('Ending value not specified');
  });

  it('should disable submit button after selecting between for the first time', () => {
    component = fixture.componentInstance;
    const repoTextControl = component.fg.controls['text'];
    const compiled = fixture.debugElement;
    component.starOption = 'Between';
    repoTextControl.setValue('react');
    fixture.detectChanges();
    const submitButton = compiled.query(By.css('.ui.green.button')).nativeElement;
    expect(submitButton.disabled).toBe(true);
  });
  
  // test invalid datatype input
  it('should have invalid data type error when inputting non-numerical entry', () => {
    component = fixture.componentInstance;
    const repoTextControl = component.fg.controls['text'];
    const range1Control = component.fg.controls['range1'];
    component.starOption = '>';
    repoTextControl.setValue('react');
    range1Control.setValue('abc');
    fixture.detectChanges();

    expect(component.fg.controls['range1'].errors.pattern).toBeTruthy();  
  });

  it('should populate invalid data type error in error box after non-numerical entry', () => {
    component = fixture.componentInstance;
    const compiled = fixture.debugElement;
    const repoTextControl = component.fg.controls['text'];
    const range1Control = component.fg.controls['range1'];
    component.starOption = '>';
    repoTextControl.setValue('react');
    range1Control.setValue('abc');
    fixture.detectChanges();
    const range1Box = compiled.query(By.css('.range1-field')).nativeElement;
    range1Box.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    const errorBox = compiled.query(By.css('.ui.error.message')).nativeElement;
    expect(errorBox.textContent).toContain('Please enter only digits for star value');
  });

  it('should disable submit button after non-numerical entry', () => {
    component = fixture.componentInstance;
    const compiled = fixture.debugElement;
    const repoTextControl = component.fg.controls['text'];
    const range1Control = component.fg.controls['range1'];
    component.starOption = '>';
    repoTextControl.setValue('react');
    range1Control.setValue('abc');
    fixture.detectChanges();

    const submitButton = compiled.query(By.css('.ui.green.button')).nativeElement;
    expect(submitButton.disabled).toBe(true);
  });

  it('should have form errors if value of first star box is bigger than second star box', () => {
    component = fixture.componentInstance;
    const compiled = fixture.debugElement;
    const range1Control = component.fg.controls['range1'];
    const range2Control = component.fg.controls['range2'];

    component.starOption = 'Between';
    range1Control.setValue('100');
    range2Control.setValue('1');
    fixture.detectChanges();
    expect(component.fg.errors.invalidStartingValue).toBeTruthy();
  });

  it('should have display errors if value of first star box is bigger than second star box', () => {
    component = fixture.componentInstance;
    const compiled = fixture.debugElement;
    const range1Control = component.fg.controls['range1'];
    const range2Control = component.fg.controls['range2'];

    component.starOption = 'Between';
    range1Control.setValue('100');
    range2Control.setValue('1');
    fixture.detectChanges();
    const errorBox = compiled.query(By.css('.ui.error.message')).nativeElement;
    expect(errorBox.textContent).toContain('Starting value must be strictly less than the ending value');

  });

  it('should still allow user to submit if first star box is bigger than second star box given that the user selects anything other than "Between"', () => {
    component = fixture.componentInstance;
    const compiled = fixture.debugElement;
    const range1Control = component.fg.controls['range1'];
    const range2Control = component.fg.controls['range2'];
    const repoTextControl = component.fg.controls['text'];
    repoTextControl.setValue('react');
    component.starOption = '>';
    range1Control.setValue('100');
    range2Control.setValue('1');
    fixture.detectChanges();
    const submitButton = compiled.query(By.css('.ui.green.button')).nativeElement;
    expect(submitButton.disabled).toBe(false);
  });

  it('should display an error box on bad API response', fakeAsync( () => {
      component = fixture.componentInstance;
      const compiled = fixture.debugElement;
      const repoTextControl = component.fg.controls['text'];
      repoTextControl.setValue('react');
      fixture.detectChanges();
      gitService = compiled.injector.get(GitService);
      spyOn(gitService, 'getRepos').and.returnValue(throwError(MOCK_API_ERROR));
      const submitButton = compiled.query(By.css('.ui.green.button'));
      submitButton.triggerEventHandler('click', null);

      fixture.detectChanges();
      const errorBox = compiled.query(By.css('.bad-response')).nativeElement;

      expect(gitService.getRepos).toHaveBeenCalled();
      expect(component.error).toBeTruthy();
      expect(errorBox.textContent).toContain("\"=110\" is not a numeric value - please provide an integer value");
    }
  ));

  it('should display child component after successful API response', fakeAsync( () => {
    component = fixture.componentInstance;
    const compiled = fixture.debugElement;
    const repoTextControl = component.fg.controls['text'];
    repoTextControl.setValue('react');
    fixture.detectChanges();
    gitService = compiled.injector.get(GitService);
    spyOn(gitService, 'getRepos').and.returnValue(of(SUCCESSFUL_API_RESP));
    const submitButton = compiled.query(By.css('.ui.green.button'));
    submitButton.triggerEventHandler('click', null);

    fixture.detectChanges();

    expect(gitService.getRepos).toHaveBeenCalled();
    expect(component.results).toBeTruthy();
    expect(component.resultsComponent).toBeTruthy();
  }
));


});
