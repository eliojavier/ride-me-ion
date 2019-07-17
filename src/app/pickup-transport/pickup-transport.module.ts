import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PickupTransportComponent} from './pickup-transport/pickup-transport.component';

@NgModule({
  declarations: [
    PickupTransportComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PickupTransportComponent
  ]
})
export class PickupTransportModule {
}
