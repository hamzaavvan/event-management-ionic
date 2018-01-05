import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

import firebase from 'firebase';
import { firebaseConfig } from './credentials';

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  rootPage: any;

  constructor(
    platform: Platform,
    private statusBar: StatusBar,
    splashScreen: SplashScreen
  ) {
    firebase.initializeApp(firebaseConfig);

    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.rootPage = 'LoginPage';
        unsubscribe();
      } else {
        this.rootPage = HomePage;
        unsubscribe();
      }
    });
    

    platform.ready().then(() => {
      statusBar.backgroundColorByHexString('#2196F3');
      this.statusBar.overlaysWebView(true);

      // set status bar to white

      splashScreen.hide();
    });
  }
}
