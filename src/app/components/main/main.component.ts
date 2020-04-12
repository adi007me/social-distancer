import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LocationService } from 'src/app/services/location/location.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/services/auth/user';
import { BookingsService } from 'src/app/services/bookings/bookings.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'sd-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {
  locationAllowed = true;
  user: any = {};
  slots: any = [];

  slotsLoded = false;

  constructor(private location: LocationService, 
              private auth: AuthService,
              private changeDetector: ChangeDetectorRef,
              private booking: BookingsService) { }

  ngOnInit(): void {
    this.location.getCurrentPosition()
      .catch(err => {
        console.log(err);
        this.locationAllowed = false;
      });

    if (this.auth.loggedIn) {
      this.getAvailableBookings().subscribe(slots => {
        this.slots = slots;
      });

      this.user = this.auth.user;
    }
    
    this.auth.loggedIn.subscribe(user => {
      this.getAvailableBookings().subscribe(slots => {
        this.slots = slots;

        this.user = user;
        this.changeDetector.detectChanges();
      })      
    });
  }

  getAvailableBookings() {
    return this.booking.getAvailableBookings().pipe(map((counts: any) => {
      return counts.slots;
    }));
  }

}
