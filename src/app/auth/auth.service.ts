import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {AppState} from '../store/state/state-model';

import * as AuthActions from '../store/actions/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenExpirationTimer: any;

  constructor(
    private store: Store<AppState>
  ) {}

  setLogoutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(AuthActions.Logout());
    }, expirationDuration);
  }

  clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }
}