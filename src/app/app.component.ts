import { Component, OnInit } from '@angular/core';
import { LocationService } from './services/location/location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'SocialDistancer';
  position = null;
  locationNotAllowed = true;


  constructor(private location: LocationService) {
  }

  ngOnInit() {
        
  }
}
