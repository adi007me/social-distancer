import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from 'src/app/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  constructor(private http: HttpClient) { }

  getAvailableBookings(): any {
    const url = `${Constants.BASE_URL}/group/counts`;

    return this.http.get(url, { withCredentials: true });
  }

  book(slot): any {
    const url = `${Constants.BASE_URL}/booking`;

    return this.http.post(url, {
      slot: slot    
    }, { withCredentials: true, responseType: 'text' });
  }

  delete(slot, hash): any {
    const url = `${Constants.BASE_URL}/booking/${slot}?hash=${hash}`;

    return this.http.delete(url, { withCredentials: true, responseType: 'text' });
  }
}
