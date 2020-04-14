import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { BookingsService } from 'src/app/services/bookings/bookings.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'sd-user-slots',
  templateUrl: './user-slots.component.html',
  styleUrls: ['./user-slots.component.less']
})
export class UserSlotsComponent implements OnInit {
  @Input() bookings;
  waiting = false;
  
  constructor(private booking: BookingsService, 
      private auth: AuthService,
      private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    // this.auth.userUpdated.subscribe(user => {
    //   const existingBookings = [...this.bookings] || [];

    //   this.bookings = user.bookings;

    //   if (existingBookings.length < this.bookings.length) { //Required due to an error. Need better solution
    //     this.changeDetector.detectChanges();
    //   }
    // });
  }

  deleteBooking(slot, hash) {
    this.waiting = true;
    
    this.booking.delete(slot, hash).subscribe(res => {
      this.auth.updateCurrentUser();
    });
  }
}
