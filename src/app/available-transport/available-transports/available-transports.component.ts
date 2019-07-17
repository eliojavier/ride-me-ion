import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {} from 'googlemaps';
import {Transport} from '../../models/Transport';
import {TransportService} from '../../services/transport.service';

declare var require: any;
const SlidingMarker = require('marker-animate-unobtrusive');

@Component({
  selector: 'app-available-transports',
  templateUrl: './available-transports.component.html',
  styleUrls: ['./available-transports.component.scss']
})
export class AvailableTransportsComponent implements OnInit, OnChanges {
  @Input() map: google.maps.Map;
  @Input() isPickupRequested: boolean;

  public transportMarkers: Array<google.maps.Marker> = [];
  transports: Transport[];

  constructor(public transportService: TransportService) {
  }

  ngOnInit() {
    this.fetchAndRefreshTransports();
    console.log('isPickupRequested: ' + this.isPickupRequested);
  }

  ngOnChanges() {
    console.log('ng on changes...');
    console.log('isPickupRequested: ' + this.isPickupRequested);
    if (this.isPickupRequested) {
      this.removeTransportMarkers();
    }
  }

  fetchAndRefreshTransports() {
    this.transportService.getTransports()
      .subscribe(
        response => {
          console.log(response);
          this.transports = response['transports'];
          if (!this.isPickupRequested) {
            this.transports.forEach(transport => {
              this.updateTransportMarker(transport);
            });
          }
        },
        error => {

        },
        () => {

        }
      );
  }

  addTransportMarker(transport) {
    const lat = transport.last_geo_location.lat;
    const lng = transport.last_geo_location.lng;
    console.log('going to add transport marker in ...[' + lat + ',' + lng + ']');

    const transportMarker = new SlidingMarker({
      map: this.map,
      position: new google.maps.LatLng(lat, lng),
      icon: 'assets/img/transport.png',
      duration: 2000,
      easing: 'linear'
    });

    console.log('transport added');
    transportMarker.set('id', transport.id);

    this.transportMarkers.push(transportMarker);
    console.log('now transportsMarkers is: ');
    console.log(this.transportMarkers);
  }

  updateTransportMarker(transport) {
    console.log(transport);
    for (let i = 0; i < this.transports.length; i++) {
      console.log('i = ' + i + '...transport.id = ' + transport.id);
      console.log(this.transportMarkers[i]);
      // find transport and update it
      if (this.transportMarkers.length > 0 && this.transportMarkers[i]['id'] === transport.id) {
        const lat = transport.last_geo_location.lat;
        const lng = transport.last_geo_location.lng;
        console.log('marker exists... and updating position to... [' + lat + ', ' + lng + ']');
        this.transportMarkers[i].setPosition(new google.maps.LatLng(lat, lng));
        return;
      }
    }

    // car does not exists in transportMarkers
    console.log('transport does not exists in transportMarkers... going to add id');
    this.addTransportMarker(transport);
  }

  removeTransportMarkers() {
    console.log('removing transport markers...');
    let numOfCars = this.transportMarkers.length;
    while (numOfCars--) {
      const transport = this.transportMarkers.pop();
      transport.setMap(null);
    }
  }

}
