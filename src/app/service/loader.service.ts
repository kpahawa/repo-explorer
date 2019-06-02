import { Injectable } from '@angular/core';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  public showLoader() {
    $("#propLoader").css('display', 'block');
  }

  public hideLoader() {
    $("#propLoader").css('display', 'none');
  }
}
