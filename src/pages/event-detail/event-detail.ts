import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { EventProvider } from '../../providers/event/event'

@IonicPage({
  segment: "event-detail/:eventId"
})
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {
  public currentEvent: any = {};
  public guestName: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public eventProvider: EventProvider) {
  }

  ionViewDidLoad() {
    this.eventProvider.getEventDetial(this.navParams.get("eventId"))
    .on("value", event => {
      this.currentEvent = event.val();
      this.currentEvent.id = event.key;
    });
  }

  addGuest(name: string): void {
    this.eventProvider.addGuest(name, this.currentEvent.id, this.currentEvent.price)
    .then(newGuest => {
      this.guestName = "";
    });
  }
}
