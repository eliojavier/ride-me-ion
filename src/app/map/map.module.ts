import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MapComponent} from './map/map.component';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {PickupModule} from '../pickup/pickup.module';
import {AvailableTransportModule} from '../available-transport/available-transport.module';
import {PickupTransportModule} from '../pickup-transport/pickup-transport.module';

@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule,
    PickupModule,
    AvailableTransportModule,
    PickupTransportModule
  ],
  providers: [
    Geolocation
  ],
  exports: [
    MapComponent
  ]
})
export class MapModule {
}
