import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';

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
  public guestPicture: string = null;
  public eventGuests: string[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public eventProvider: EventProvider, public cameraPlugin: Camera) {
  }

  ionViewDidLoad() {
    var eventId: string = this.navParams.get("eventId");

    this.eventProvider.getEventDetail(eventId)
    .on("value", event => {
      console.log(event)
      console.log(event.val())
      this.currentEvent = event.val();
      this.currentEvent.id = event.key;
    });

    this.eventProvider.getEventGuest(eventId).on("value", (guests) => {
      guests.forEach(guest => {
        if (guest.val().profilePicture)
          this.eventGuests.push({name: guest.val().guestName, dp: guest.val().profilePicture});
        else
        this.eventGuests.push({name: guest.val().guestName});
        
        return false;
      });
    });

  }

  addGuest(name: string): void {
    this.eventProvider.addGuest(name, this.currentEvent.id, this.currentEvent.price, this.guestPicture)
    .then(newGuest => {
      this.guestName = "";
      this.guestPicture = "";
    });
  }

  takePicture(): void {
    this.cameraPlugin.getPicture({
      quality: 95,
      destinationType: this.cameraPlugin.DestinationType.DATA_URL,
      sourceType: this.cameraPlugin.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: this.cameraPlugin.EncodingType.PNG,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: true
    }).then(image => {
      this.guestPicture = image;
    }, error => {
      console.log("Error -> " + JSON.stringify(error));
    });
  }
}
