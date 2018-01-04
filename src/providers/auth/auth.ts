import { Injectable } from '@angular/core';

import firebase from 'firebase';
import { User } from '@firebase/auth-types';

@Injectable()
export class AuthProvider {
  constructor() {
    console.log('Hello AuthProvider Provider');
  }

  loginUser(email: string, password: string): Promise<User> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signupUser(name: string, email: string, password: string): Promise<void> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(newUser => {
        firebase
          .database()
          .ref(`/userProfile/${newUser.uid}`)
          .set({
            displayName: name,
            email: email,
          });
      })
      .catch(error => {
        console.error(error);
        throw new Error(error);
      });
  }

  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    const userId = firebase.auth().currentUser.uid;

    firebase
      .database()
      .ref(`/userProfile/${userId}`)
      .off();

    return firebase.auth().signOut();
  }
}
