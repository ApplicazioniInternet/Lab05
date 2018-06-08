import { Component, OnInit } from '@angular/core';
import {ToolbarComponent} from '../toolbar/toolbar.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  toolbarTitle = 'Customer';

  constructor() {}

  ngOnInit() {
  }

}
