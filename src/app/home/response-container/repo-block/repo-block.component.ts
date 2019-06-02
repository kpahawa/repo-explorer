import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-repo-block',
  templateUrl: './repo-block.component.html',
  styleUrls: ['./repo-block.component.css']
})
export class RepoBlockComponent implements OnInit {
  @Input() repo: any;

  // This component is just a singular repo segment block on the UI
  constructor() { }

  ngOnInit() { }
    
}
