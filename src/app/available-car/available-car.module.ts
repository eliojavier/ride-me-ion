import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvailableCarsComponent } from './available-cars/available-cars.component';

@NgModule({
  declarations: [
    AvailableCarsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AvailableCarsComponent
  ]
})
export class AvailableCarModule { }
