import { Injectable } from '@angular/core';

import firebase from 'firebase';

@Injectable()
export class EventProvider {
  public eventListRef: firebase.database.Reference;

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.eventListRef = firebase.database()
        .ref(`/userProfile/${user.uid}/eventList`);
      } 
    }); 
  }

  createEvent(name: string, date: string, price: number, cost: number): firebase.database.ThenableReference {
    return this.eventListRef.push({
      name, date, price: price*1, cost: cost*1, revenue: cost*-1
    });
  }

  getEventList(): firebase.database.Reference {
    return this.eventListRef;
  }

  getEventDetail(id: string): firebase.database.Reference {
    return this.eventListRef.child(id);
  }

  getEventGuest(eventId: string): firebase.database.Reference {
    return this.eventListRef.child(`${eventId}/guestList`);
  }

  addGuest(guestName: string, eventId: string, eventPrice: number, guestPicture: string = null): PromiseLike<any> {
    return this.eventListRef.child(`${eventId}/guestList`).push({guestName})
    .then(newGuest => {
      this.eventListRef.child(eventId).transaction(event => {
        event.revenue += eventPrice;
        return event;
      });

      if (guestPicture != null) {
        firebase.storage().ref(`/guestProfile/${newGuest.key}/profilePicture`)
        .putString(guestPicture, 'base64', {contentType: 'image/png'})
        .then(savedPicture => {
          this.eventListRef.child(`${eventId}/guestList/${newGuest.key}/profilePicture`)
          .set(savedPicture.downloadURL);
        });
      }
    });
  }
}