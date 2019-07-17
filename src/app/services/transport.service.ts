import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, of, timer} from 'rxjs/index';
import {catchError, switchMap} from 'rxjs/internal/operators';
import {Transport} from '../models/Transport';

@Injectable({
  providedIn: 'root'
})
export class TransportService {
  API_URL = environment.API_URL;
  public directionsService: google.maps.DirectionsService;
  public myRoute: any;
  public myRouteIndex: number;

  constructor(public http: HttpClient) {
    this.directionsService = new google.maps.DirectionsService();
  }

  getTransports() {
    // return this.http.get(`${this.API_URL}transports`);
    return timer(0, 35000)
      .pipe(
        switchMap(_ => this.http.get(`${this.API_URL}transports`))
      );
  }

  findPickupTransport(pickupLocation) {
    console.log(pickupLocation);
    this.myRouteIndex = 0;
    return this.http.get(`${this.API_URL}transports/1`)
      // .subscribe(
      //   response => {
      //     const transport: Transport = response['transport'];
      //     const lat = transport.last_geo_location.lat;
      //     const lng = transport.last_geo_location.lng;
      //     const start = new google.maps.LatLng(lat, lng);
      //     const end = pickupLocation;
      //
      //     return this.simulateRoute(start, end);
      //   },
      //   error => {
      //
      //   },
      //   () => {
      //   }
      // );
  }

  simulateRoute(start, end) {
    return Observable.create(observable => {
      this.calculateRoute(start, end)
        .subscribe(
          directions => {
            // get route path
            this.myRoute = this.getSegmentedDirections(directions);
            // return pickup transport
            this.getPickupTransport()
              .subscribe(
                transport => {
                  observable.next(transport); // first increment in transport path
                },
                error => {

                },
                () => {
                }
              );
          },
          error => {

          },
          () => {
          }
        );
    });
  }

  getSegmentedDirections(directions) {
    const route = directions.routes[0];
    const legs = route.legs;
    const path = [];
    const increments = [];
    let duration = 0;

    let numOfLegs = legs.length;

    // backwards through each leg in directions route
    while (numOfLegs--) {
      const leg = legs[numOfLegs];
      const steps = leg.steps;
      let numOfSteps = steps.length;

      while (numOfSteps--) {
        const step = steps[numOfSteps];
        const points = step.path;
        let numOfPoints = points.length;

        duration += step.duration.value;

        while (numOfPoints--) {
          const point = points[numOfPoints];
          path.push(point);

          increments.unshift({
            position: point, // car position
            time: duration, // time left before arrival
            path: path.slice(0) // clone array to prevent referencing final path array
          });
        }
      }
    }

    return increments;
  }

  calculateRoute(start, end) {
    return Observable.create(observable => {
      this.directionsService.route({
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING
      }, (response, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          observable.next(response);
        } else {
          observable.error(status);
        }
      });
    });
  }

  getPickupTransport() {
    return Observable.create(observable => {
      const transport = this.myRoute[this.myRouteIndex];

      observable.next(transport);
      this.myRouteIndex++;
    });
  }
}
