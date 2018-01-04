import { Component } from '@angular/core';
import { NavController, Loading, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { ProfileProvider } from '../../providers/profile/profile';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public loading: Loading;
  public user: any;

  constructor(public navCtrl: NavController, public auth: AuthProvider, public loadingCtrl: LoadingController, public profileProider: ProfileProvider) {
  }

  ionViewDidLoad() {
    let userProfile = this.profileProider.getUserProfile();

    if (userProfile) {
      userProfile.on("value", user => {
        this.user = user.val();
        console.log(user)
      });

    }
  }

  signoutUser() {
    this.auth.logoutUser().then(() => {
      this.loading.dismiss().then(() => {
        this.navCtrl.setRoot("LoginPage");
      });
    });

    this.loading = this.loadingCtrl.create({content: "Logging Out"});
    this.loading.present();
  }

  gotoProfile():void {
    this.navCtrl.push("ProfilePage");
  }
}
