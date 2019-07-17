import {Component, Input, OnInit} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {LoadingController} from '@ionic/angular';
import {Observable} from 'rxjs/index';
import {LatLng} from '@ionic-native/google-maps';
import {} from 'googlemaps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() isPickupRequested: boolean;
  public map: google.maps.Map;
  public isMapIdle: boolean;
  public currentLocation: google.maps.LatLng;

  constructor(private geolocation: Geolocation,
              public loadingController: LoadingController) {
  }

  ngOnInit() {
    this.map = this.createMap();
    this.addMapEventListeners();
    this.getCurrentLocation()
      .subscribe(currentLocation => {
        this.centerLocation(currentLocation);
      });
  }

  getCurrentLocation(): Observable<any> {
    // this.presentLoading();

    return Observable.create(observable => {
      this.geolocation.getCurrentPosition().then((resp) => {
        const lat = resp.coords.latitude;
        const lng = resp.coords.longitude;
        console.log(lat);
        console.log(lng);
        // const location = new google.maps.LatLng(lat, lng);
        const location: LatLng = new LatLng(lat, lng);
        console.log(location);
        observable.next(location);
      }).catch((error) => {
        console.log('Error getting location', error);
      });
    });

  }

  createMap(location = new google.maps.LatLng(40.712784, -74.005941)) {
    const mapOptions = {
      center: location,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    };

    const mapEl = document.getElementById('map');
    return new google.maps.Map(mapEl, mapOptions);
  }

  centerLocation(location = null) {
    if (location) {
      console.log(location);
      this.map.panTo(location);
    } else {
      this.getCurrentLocation()
        .subscribe(currentLocation => {
          this.map.panTo(currentLocation);
        });
    }
  }

  addMapEventListeners() {
    google.maps.event.addListener(this.map, 'dragstart', () => {
      this.isMapIdle = false;

    });
    google.maps.event.addListener(this.map, 'idle', () => {
      this.isMapIdle = true;
    });
  }

  updatePickupLocation(location) {
    this.currentLocation = location;
    this.centerLocation(location);
  }
}
