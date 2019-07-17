import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvailableTransportsComponent } from './available-transports/available-transports.component';

@NgModule({
  declarations: [
    AvailableTransportsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AvailableTransportsComponent
  ]
})
export class AvailableTransportModule { }
