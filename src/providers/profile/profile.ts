import { Injectable } from '@angular/core';
import { IonicPage, NavController, AlertController, Alert, Loading, LoadingController } from 'ionic-angular';

import firebase from 'firebase';
import { Reference } from '@firebase/database';
import { User, AuthCredential } from 'firebase/database';

@Injectable()
export class ProfileProvider {
  public userProfile: firebase.database.Reference;
  public currentUser: User;
  public alert: Alert;

  constructor(public loadingCtrl : LoadingController, public alertCtrl: AlertController) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user;
        this.userProfile = firebase.database().ref(`/userProfile/${user.uid}`);
      }
    });
  }

  getUserProfile(): firebase.database.Reference {
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

  updatePassword(newPassword: string, oldPassword: string, loading: Loading): Promise<any> {
    const credentials: AuthCredential = firebase.auth.EmailAuthProvider.credential(
      this.currentUser.email,
      oldPassword
    );

    return this.currentUser
      .reauthenticateWithCredential(credentials)
      .then(user => {
        this.currentUser.updatePassword(newPassword).then(user => {
          this.alert = this.alertCtrl.create({message: "Password changed"});
          this.alert.present();
          loading.dismiss();
        });
      })
      .catch(error => {
        this.alert = this.alertCtrl.create({message: error});
        this.alert.present();
        loading.dismiss();
      });
  }
}
