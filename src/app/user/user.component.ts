import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ClientHttpService} from '../client-http.service';
import {Position} from '../position';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  toolbarTitle = 'User';
  positions$: Observable<Position[]>;

  constructor(private client: ClientHttpService ) { }

  ngOnInit() {
      this.positions$ = this.client.getUserPositions();
  }

  getDate(timestamp: number): string {
      return new Date(timestamp).toLocaleString();
  }
}
