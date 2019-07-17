import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {TransportService} from '../../services/transport.service';
import {} from 'googlemaps';
import {Transport} from '../../models/Transport';

declare var require: any;
const SlidingMarker = require('marker-animate-unobtrusive');

@Component({
  selector: 'app-pickup-transport',
  templateUrl: './pickup-transport.component.html',
  styleUrls: ['./pickup-transport.component.scss']
})
export class PickupTransportComponent implements OnInit, OnChanges {
  @Input() map: google.maps.Map;
  @Input() isPickupRequested: boolean;
  @Input() pickupLocation: google.maps.LatLng;
  public transport: Transport;
  public pickupTransportMarker: SlidingMarker;
  public polylinePath: google.maps.Polyline;

  constructor(public transportService: TransportService) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.isPickupRequested) {
      this.requestTransport();
    } else {
      this.removeTransport();

      this.removeDirections();
    }
  }

  requestTransport() {
    console.log('req transport ' + this.pickupLocation);
    this.transportService.findPickupTransport(this.pickupLocation)
      .subscribe(
        response => {
          // .subscribe(
          //   response => {
          const transport: Transport = response['transport'];
          const lat = transport.last_geo_location.lat;
          const lng = transport.last_geo_location.lng;
          const start = new google.maps.LatLng(lat, lng);
          const end = this.pickupLocation;
          console.log(start.lat(), start.lng());
          console.log(end.lat(), end.lng());
          this.transportService.simulateRoute(start, end)
            .subscribe(
              res => {
                console.log('*********************');
                console.log(res);
                // show transport marker
                this.addTransportMarker(transport);
                console.log('added transport marker');


                // show transport path/directions to you
                this.showDirections(res.path);
                console.log('*********************');


              },
              error => {

              },
              () => {
              }
            );

          // return this.simulateRoute(start, end);
          //   },
          //   error => {
          //
          //   },
          //   () => {
          //   }
          // );


          console.log();



          // keep updating transport location
          // this.updateTransport();
        },
        error => {

        },
        () => {
        }
      );
  }

  updateTransport() {
    this.transportService.getPickupTransport()
      .subscribe(
        transport => {
          // animate transport to next point
          const lat = transport.last_geo_location.lat;
          const lng = transport.last_geo_location.lng;
          this.pickupTransportMarker.setPosition(lat, lng);

          // set direction path for transport
          this.polylinePath.setPath(transport.path);

          // keep updating transport
          if (transport.path.length > 1) {
            setTimeout(() => {
              this.updateTransport();
            }, 1000);
          } else {
            // car arrived
          }
        },
        error => {

        },
        () => {
        }
      );
  }

  showDirections(path) {
    this.polylinePath = new google.maps.Polyline({
      path: path,
      strokeColor: '#FF0000',
      strokeWeight: 3
    });
    this.polylinePath.setMap(this.map);
  }

  addTransportMarker(transport) {
    const lat = transport.last_geo_location.lat;
    const lng = transport.last_geo_location.lng;
    console.log('going to add transport marker in ...[' + lat + ',' + lng + ']');

    this.pickupTransportMarker = new SlidingMarker({
      map: this.map,
      position: new google.maps.LatLng(lat, lng),
      icon: 'assets/img/transport.png',
      duration: 1000,
      easing: 'linear'
    });
  }

  removeTransport() {
    if (this.pickupTransportMarker) {
      this.pickupTransportMarker.setMap(null);
      this.pickupTransportMarker = null;
    }
  }

  removeDirections() {
    if (this.polylinePath) {
      this.polylinePath.setMap(null);
      this.polylinePath = null;
    }
  }
}
