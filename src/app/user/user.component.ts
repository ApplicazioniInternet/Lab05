import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ClientHttpService} from '../client-http.service';
import {Position} from '../position';
import {FormControl} from '@angular/forms';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  toolbarTitle = 'User';
    textareaForm = new FormControl();
  positions$: Observable<Position[]>;

  constructor(private client: ClientHttpService, private snackBar: MatSnackBar ) { }

  ngOnInit() {
      this.positions$ = this.client.getUserPositions();
  }

  getDate(timestamp: number): string {
      return new Date(timestamp).toLocaleString();
  }

    submit() {
        this.client.uploadPositions(this.textareaForm.value).subscribe(
            data  => this.openSnackBar('Caricamento riuscito', 'OK'),
            err  => this.openSnackBar( err.error.message, 'OK')
        );
        this.textareaForm.reset();
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }
}
