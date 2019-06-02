import { Component, OnInit, ViewChild } from '@angular/core';
import { LoaderService } from '../service/loader.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GIT_LICENSES, License } from '../models/license';
import { GitService } from '../service/git.service';
import { CustomErrorHandler } from '../service/error-handler.service';
import { ResponseContainerComponent } from './response-container/response-container.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  fg: FormGroup;
  licenseOptions = GIT_LICENSES;
  options = ['Any', '<', '<=', '=', '>', '>=', 'Between'];
  starOption = this.options[0];
  results: any;
  error: Error;
  
  @ViewChild('apiResults')
  resultsComponent: ResponseContainerComponent;

  constructor(private _loaderService: LoaderService, private _gitService: GitService) { }

  ngOnInit() {
    this.fg = new FormGroup({
      text: new FormControl(null, Validators.required),
      license: new FormControl('default', Validators.required),
      range1: new FormControl(null, Validators.pattern('[0-9]*')),
      range2: new FormControl(null, Validators.pattern('[0-9]*')),
      isForked: new FormControl(false, Validators.required)
    }, {validators: this.starsValidator.bind(this)});
    this._loaderService.hideLoader();
  }

  setOption(option: string) {
    this.starOption = option;
    this.fg.updateValueAndValidity();
  }

  queryGit() {
    this._loaderService.showLoader();
    this.error = null;
    this.results = null;
    this._gitService.getRepos(this.fg.value.text, this.starOption, 
                              this.fg.value.range1, this.fg.value.range2, 
                              this.fg.value.isForked, this.fg.value.license).subscribe(
      res => {
        this.results = res;
        this._loaderService.hideLoader();
      }, err => {

        this._loaderService.hideLoader();
        this.error = CustomErrorHandler.parseError(err);
      }
    );
  }

  private starsValidator(fg: FormGroup) {
    const errors = {};
    if (this.starOption === 'Between') {

      let r1 = fg.get('range1').value;
      let r2 = fg.get('range2').value;
      if (!r1) {
        errors['invalidStartingValue'] = "Starting value not specified";
      }
      
      if (!r2) {
        errors['invalidEndingValue'] = "Ending value not specified";
      }

      if (r1 && r2) {
        r1 = parseInt(r1);
        r2 = parseInt(r2);
        if (r1 < 0) {
          errors['invalidStartingValue'] = "Starting value must be greater than or equal to 0";
        } else if (r2 < 0) {
          errors['invalidEndingValue'] = "Ending value must be greater than or equal to 0";
        }
        if (r1 >= r2) {
          errors['invalidStartingValue'] = "Starting value must be strictly less than the ending value";
        }
      }
    } else if (this.starOption !== 'Any') {
      let r1 = fg.get('range1').value;

      if (!r1) {
        errors['invalidStartingValue'] = "Starting value not specified";
      } else {
        r1 = parseInt(r1);
        if (r1 <= 0) {
          errors['invalidStartingValue'] = "Starting value must be strictly greater than 0";
        }
      }
    }
    if (Object.keys(errors).length) {
      return errors;
    }
    return null;
    
  }
}
