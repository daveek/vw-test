import { Component } from '@angular/core';
import { Keyboards } from './shared/models/keyboards';
import { KeyboardsService } from './shared/services/keyboards.service';
import { filter, Observable } from 'rxjs';
import { isNotNull } from './shared/helpers/is-not-null.helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'vw-test';

  public keyboards$ = new Observable<Array<Keyboards>>();

  constructor(private keyboardsService: KeyboardsService) {}

  ngOnInit(): void {
    this.keyboards$ = this.keyboardsService.keyboards$;
  }
}
