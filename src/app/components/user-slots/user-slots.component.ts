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
      private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.userUpdated.subscribe(user => {
      console.log('user updated', user);
      this.bookings = user.bookings;
    });
  }

  deleteBooking(slot, hash) {
    console.log(hash);
    this.waiting = true;
    
    this.booking.delete(slot, hash).subscribe(res => {
      this.auth.updateCurrentUser().subscribe();
    });
  }
}
