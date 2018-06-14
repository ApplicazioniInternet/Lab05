import { Component, OnInit } from '@angular/core';
import {ClientHttpService} from '../client-http.service';
import {Observable} from 'rxjs';
import {User} from '../user';
import {Position} from '../position';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  toolbarTitle = 'Admin';
  positions$: Observable<Position[]>;
  users$: Observable<User[]>;
  displayedColumns = ['id', 'username', 'role'];
  constructor( private client: ClientHttpService) { }

  ngOnInit() {
    this.positions$ = this.client.getPositions();
    this.users$ = this.client.getUsers();
  }

  getUsersPositions(id: number) {
      this.positions$ = this.client.getUsersPositions(id);
  }

  getDate(timestamp: number): string {
      return new Date(timestamp).toLocaleString();
  }
}
