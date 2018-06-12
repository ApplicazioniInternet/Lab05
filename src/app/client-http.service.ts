import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientHttpService {
    private path = 'http://localhost:8080';

    constructor(private http: HttpClient) {}

    // Uses http.get() to load data from a single API endpoint
    getPositions(): Observable<Position[]> {
        return this.http.get<Position[]>(this.path + '/secured/user/positions')
            // .subscribe(
            //     data => data.toString(),
            //     err => console.error(err)
            // )
            ;
    }
}
