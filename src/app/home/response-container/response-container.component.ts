import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-response-container',
  templateUrl: './response-container.component.html',
  styleUrls: ['./response-container.component.css']
})
export class ResponseContainerComponent implements OnInit {
  @Input() results: any;
  public items: any[];
  public noResults = true;

  constructor() { }

  ngOnInit() {

    if (this.results) {
      this.noResults = this.results.items.length === 0;
      if (!this.noResults) {
        this.items = this.results.items;
      }
    }
  }

}
