import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, delay, map, mergeMap } from 'rxjs/operators';
import { Keyboards } from '../models/keyboards';

@Injectable({
  providedIn: 'root',
})
export class KeyboardsService {
  // URL to connect with server and retrieve data
  private readonly API_URL = 'http://localhost:3000/keyboards';

  // Keyboards Data
  private _keyboards: Array<Keyboards> = [];

  // Streams of observable to get
  private readonly keyboardsSubject$ = new BehaviorSubject<Keyboards | null>(
    null
  );
  _Keyboards$: Observable<Keyboards | null> =
    this.keyboardsSubject$.asObservable();

  constructor(private http: HttpClient) {
    this._keyboards = [];
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(`onInit Keybs Service`);
    this.getKeyboards().subscribe((kbs) => (this._keyboards = kbs));
  }

  public get keyboards(): Array<Keyboards> {
    return this._keyboards;
  }

  public getKeyboards(): Observable<Array<Keyboards>> {
    console.log('Retrieving keyboards from server');
    return this.http
      .get<Array<Keyboards>>(this.API_URL)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error(`Error in keyboard service client: ${error.error.message}`);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Error in keyboard service client [${error.status}]: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError(error);
  }
}
