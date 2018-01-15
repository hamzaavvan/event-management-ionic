import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import firebase from 'firebase';

@Injectable()
export class EventProvider {
  public eventListRef: firebase.database.Reference;

  constructor(public http: HttpClient) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.eventListRef = firebase.database()
        .ref(`/userProfile/${user.uid}/eventList`);
      } 
    }); 
  }

  createEvent(name: string, date: string, price: number, cost: number): firebase.database.ThenableReference {
    return this.eventListRef.push({
      name, date, price: price*1, cost: cost*1, revenue: cost*1
    });
  }

  getEventList(): firebase.database.Reference {
    return this.eventListRef;
  }

  getEventDetial(id: string): firebase.database.Reference {
    return this.eventListRef.child(id);
  }
}