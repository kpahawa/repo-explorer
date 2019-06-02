import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { LoaderService } from './service/loader.service';
import { HomeComponent } from './home/home.component';
import { HttpService } from './service/http.service';
import { GitService } from './service/git.service';
import { ResponseContainerComponent } from './home/response-container/response-container.component';
import { RepoBlockComponent } from './home/response-container/repo-block/repo-block.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ResponseContainerComponent,
    RepoBlockComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    LoaderService,
    HttpService,
    GitService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
