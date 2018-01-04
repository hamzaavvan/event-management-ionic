import { Injectable } from '@angular/core';

import firebase from 'firebase';
import { Reference } from '@firebase/database-types';
import { User, AuthCredential } from '@firebase/auth-types';

@Injectable()
export class ProfileProvider {
  public userProfile: Reference;
  public currentUser: User;

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user;
        this.userProfile = firebase.database().ref(`/userProfile/${user.uid}`);
      }
    });
  }

  getUserProfile(): Reference {
    return this.userProfile;
  }

  updateName(displayName: string): Promise<void> {
    return this.userProfile.update({ displayName });
  }

  updateDOB(dateOfBirth: string): Promise<void> {
    return this.userProfile.update({ dateOfBirth });
  }

  updateEmail(newEmail: string, password: string): Promise<any> {
    const credentials: AuthCredential = firebase.auth.EmailAuthProvider.credential(
      this.currentUser.email,
      password
    );

    return this.currentUser
      .reauthenticateWithCredential(credentials)
      .then(user => {
        this.currentUser.updateEmail(newEmail).then(user => {
          this.userProfile.update({ email: newEmail });
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  updatePassword(newPassword: string, oldPassword: string): Promise<any> {
    const credentials: AuthCredential = firebase.auth.EmailAuthProvider.credential(
      this.currentUser.email,
      oldPassword
    );

    return this.currentUser
      .reauthenticateWithCredential(credentials)
      .then(user => {
        this.currentUser.updatePassword(newPassword).then(user => {
          console.log('Password changed');
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
}
