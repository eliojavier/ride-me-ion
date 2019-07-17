import {Component} from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public isPickupRequested = false;

  constructor(public navCtrl: NavController) {
  }

  confirmPickup() {
    this.isPickupRequested = true;
    console.log(this.isPickupRequested);
  }

  cancelPickup() {
    this.isPickupRequested = false;
    console.log(this.isPickupRequested);
  }
}
