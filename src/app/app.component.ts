import { Component } from '@angular/core';
import { Keyboards } from './shared/models/keyboards';
import { KeyboardsService } from './shared/services/keyboards.service';
import { filter } from 'rxjs';
import { isNotNull } from './shared/helpers/is-not-null.helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'vw-test';

  public keyboards = new Array<Keyboards>();

  constructor(private keyboardsService: KeyboardsService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.keyboardsService
      .getKeyboards()
      .pipe(filter(isNotNull))
      .subscribe((keys) => (this.keyboards = keys));
  }
}
