import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from './user';
import {Position} from './position';

@Injectable({
  providedIn: 'root'
})
export class ClientHttpService {
    private path = 'http://localhost:8080';

    constructor(private http: HttpClient) {}

    // Uses http.get() to load data from a single API endpoint
    getPositions(): Observable<Position[]> {
        return this.http.get<Position[]>(this.path + '/secured/admin/positions');
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.path + '/secured/admin/users');
    }

    getUserPositions(): Observable<Position[]> {
        return this.http.get<Position[]>(this.path + '/secured/user/positions');
    }

    getUsersPositions(id: number): Observable<Position[]> {
        return this.http.get<Position[]>(this.path + '/secured/admin/users/' + id + '/positions');
    }

    uploadPositions(textarea: string) {
        return this.http.post(this.path + '/secured/user/positions', textarea, {});
    }
}
