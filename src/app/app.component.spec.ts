import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ResponseContainerComponent } from './home/response-container/response-container.component';
import { HttpService } from './service/http.service';
import { LoaderService } from './service/loader.service';
import { GitService } from './service/git.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RepoBlockComponent } from './home/response-container/repo-block/repo-block.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HomeComponent,
        ResponseContainerComponent,
        RepoBlockComponent
      ],
      providers: [
        LoaderService,
        HttpService,
        GitService
      ],
      imports: [
        RouterTestingModule,
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have 3 sections`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.debugElement.children.length).toEqual(3);
  });

  it('should render the navbar', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('header').textContent).toContain('Git Repo Searcher');
  });
});
