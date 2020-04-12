import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { BookingsService } from 'src/app/services/bookings/bookings.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'sd-slots',
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.less']
})
export class SlotsComponent implements OnInit {
  @Input() slots;
  waiting = false;

  constructor(private booking: BookingsService,
              private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.loggedIn.subscribe((user) => {
      this.booking.getAvailableBookings().subscribe(counts => {
        this.slots = counts.slots;
      })
    });
  }

  bookSlot(s) {
    this.waiting = true;

    this.booking.book(s).subscribe(res => {
      this.auth.updateCurrentUser().subscribe();

      this.booking.getAvailableBookings().subscribe(counts => {
        this.slots = counts.slots;
      })
    });
  }

}
