
import {of as observableOf,  Observable, observable } from 'rxjs';

import {map, catchError} from 'rxjs/operators';
import { Injectable, EventEmitter } from '@angular/core';
import { User } from './user';
import { Constants } from '../../constants/constants';

import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {
  public authStatus : Boolean;
  public user: User;
  public loggedIn: EventEmitter<User> = new EventEmitter<User>();
  public loggedOut: EventEmitter<Boolean> = new EventEmitter();
  public userUpdated: EventEmitter<User> = new EventEmitter<User>();

  constructor(public http: HttpClient) {
  }

  updateCurrentUser() {
    const url = `${Constants.BASE_URL}/auth/currentuser`;
    
    this.http.get<any>(url, { withCredentials: true }).subscribe(user => {
      this.assignCurrentUser(user);

      this.userUpdated.emit(this.user);

      return this.user;
    });
  }

  authenticate(token: string, lat: number, lon: number) : Observable<User> {
    const url = `${Constants.BASE_URL}/auth/loggedin?token=${token}&latitude=${lat}&longitude=${lon}`;

    return this.http.get<any>(url, { withCredentials: true }).pipe(map(user => {
      this.assignCurrentUser(user);

      this.authStatus = Boolean(user);

      this.loggedIn.emit(this.user);

      return this.user;
    }));
  }

  logout() {
    const url = Constants.BASE_URL + '/auth/logout';

    return this.http.get(url, { withCredentials: true }).pipe(response => {
      this.authStatus = false;
      this.user = null;

      this.loggedOut.emit(true);

      return response;
    });
  }

  private assignCurrentUser(user) {
    const d = new Date();
    const today = new Date(d.getFullYear(), d.getMonth(), d.getDate());

    let bookings = user.bookings && user.bookings.filter(b => !b.cancelled && (new Date(b.date) > today));

    this.user = {...user, bookings};
  }
}
