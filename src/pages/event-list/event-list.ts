import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { EventProvider } from '../../providers/event/event'

@IonicPage()
@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html',
})
export class EventListPage {
  public eventList: Array<any> = [];
  public loading: boolean;

  constructor(public navCtrl: NavController, public eventProvider: EventProvider) {
  }

  ionViewDidLoad() {
    this.loading = true;
    let eventList = this.eventProvider.getEventList();

    eventList.on("value", eventsList => {
      this.eventList = [];
      
      console.log(eventsList)

      eventsList.forEach(event => {
        this.eventList.push({
          id: event.key,
          name: event.val().name,
          price: event.val().price,
          date: event.val().date
        });

        return false;
      });
      
      this.loading = false;
    });
  }

  goToEventDetail(eventId): void {
    this.navCtrl.push('EventDetailPage', {eventId: eventId});
  }
}