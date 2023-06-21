import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  of,
  throwError,
  filter,
  Subject,
} from 'rxjs';
import {
  catchError,
  delay,
  map,
  mergeMap,
  take,
  takeUntil,
} from 'rxjs/operators';
import { Keyboards } from '../models/keyboards';
import { isNotNull } from '../helpers/is-not-null.helper';

@Injectable({
  providedIn: 'root',
})
export class KeyboardsService {
  // URL to connect with server and retrieve data
  private readonly API_URL = 'http://localhost:3000/keyboards';

  // Streams of observable to get
  private readonly keyboardsSubject$ = new BehaviorSubject<Array<Keyboards>>(
    []
  );
  _keyboards$: Observable<Keyboards[]> = this.keyboardsSubject$.asObservable();
  private readonly _onDestroy$ = new Subject<void>();

  constructor(private http: HttpClient) {
    this.fetchKeyboards();
  }

  ngOnInit(): void {
    console.log(`onInit Keyboards Service`);
  }

  public ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  private fetchKeyboards(): void {
    this.getKeyboards()
      .pipe(filter(isNotNull), take(1), takeUntil(this._onDestroy$))
      .subscribe(
        (kbs: Array<Keyboards>) => {
          this.keyboardsSubject$.next(kbs);
        },
        (error: any) => {
          console.error('Error fetching keyboards:', error);
        }
      );
  }

  public get keyboards$(): Observable<Array<Keyboards>> {
    return this._keyboards$;
  }

  private getKeyboards(): Observable<Array<Keyboards>> {
    console.log('Retrieving keyboards from server');
    return this.http
      .get<Array<Keyboards>>(this.API_URL)
      .pipe(catchError(this.handleError));
  }

  public getKeyboardById(id: string): Observable<Keyboards> {
    const url = `${this.API_URL}/${id}`;
    return this.http.get<Keyboards>(url);
  }

  public createKeyboard(keyboard: Keyboards): Observable<Keyboards> {
    return this.http.post<Keyboards>(this.API_URL, keyboard);
  }

  public updateKeyboard(
    id: string,
    keyboard: Partial<Keyboards>
  ): Observable<Keyboards> {
    const url = `${this.API_URL}/${id}`;
    return this.http.patch<Keyboards>(url, keyboard);
  }

  public deleteKeyboard(id: string): Observable<void> {
    const url = `${this.API_URL}/${id}`;
    return this.http.delete<void>(url);
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
