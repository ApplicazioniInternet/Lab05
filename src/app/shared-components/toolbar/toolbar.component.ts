import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  private _toolbarTitle: string;

  constructor() { }

  ngOnInit() {
  }

  @Input()
  set toolbarTitle(value: string) {
      this._toolbarTitle = value;
  }

}
