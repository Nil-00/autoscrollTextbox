import { Injectable } from '@angular/core';
import { Subject, Observable, of, timer } from 'rxjs';
import { switchMap, map, concatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  logData$: Observable<string>;
  data$ = new Subject<string>();
  constructor() {}

  startDataflow() {
    const datastring = '';
    timer(0, 2000).subscribe(() => this.data$.next(''));

    this.logData$ = this.data$.pipe(map(res => this.createMockString()));
  }
  createMockString() {
    let text = '';
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const x = Math.floor(Math.random() * (80 - 20 + 1)) + 20;
    for (let i = 0; i < x; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}
