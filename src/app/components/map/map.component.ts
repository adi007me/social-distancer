import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location/location.service';

@Component({
  selector: 'sd-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})
export class MapComponent implements OnInit {
  public position = null;

  constructor(private location: LocationService) { }

  ngOnInit(): void {
    this.location.getCurrentPosition().then(position => {
      this.position = position;
    });

    this.init();
  }

  init() {
    let groups = [];

    let slots = {};

    for (let i = 0; i < 24; i++) {
      slots[i] = [];
    }

    const startX = 18.64;
    const startY = 73.72;
    const endX = 18.6625;
    const endY = 73.76;
    const stepX = 0.0025;
    const stepY = 0.0025;

    const xSteps = Math.ceil(Math.abs(startX - endX)/stepX);
    const ySteps = Math.ceil(Math.abs(startY - endY)/stepY);

    for (let x = 0; x < xSteps; x++) {
      for (let y = 0; y < ySteps; y++) {
        const lowerBound = {
          x: startX + stepX * x,
          y: startY + stepY * y
        };
        
        const upperBound = {
          x: startX + stepX * (x + 1),
          y: startY + stepY * (y + 1)
        };
        
        const group = {
          id: 'G' + x + '' + y,
          lowerBound,
          upperBound,
          slots
        };
        
        groups['G' + x + '' + y] = group;
      }
    }
  }
}
