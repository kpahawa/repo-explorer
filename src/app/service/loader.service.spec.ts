import { TestBed, ComponentFixture } from '@angular/core/testing';

import { LoaderService } from './loader.service';
import { AppComponent } from '../app.component';
import { HomeComponent } from '../home/home.component';
import { ResponseContainerComponent } from '../home/response-container/response-container.component';
import { RepoBlockComponent } from '../home/response-container/repo-block/repo-block.component';
import { HttpService } from './http.service';
import { GitService } from './git.service';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
declare var $: any;


describe('LoaderService', () => {
  let loaderService: LoaderService; 
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
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
    loaderService = TestBed.get(LoaderService);
    fixture = TestBed.createComponent(AppComponent)
  });

  it('should be created', () => {
    expect(loaderService).toBeTruthy();
  });
});
