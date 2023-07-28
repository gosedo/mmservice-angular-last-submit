import { Component } from '@angular/core';
import * as fromApp from '../../src/app/store/state/state-model';
import * as AuthActions from '../../src/app/store/actions/auth.actions';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'maintenance-mgmt-sys';


  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {

    //this.store.dispatch( AuthActions.AutoLogin());

  }


}
