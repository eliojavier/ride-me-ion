import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PickupComponent } from './pickup/pickup.component';

@NgModule({
  declarations: [
    PickupComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PickupComponent
  ]
})
export class PickupModule { }
