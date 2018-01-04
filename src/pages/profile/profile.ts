import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, Alert, Loading, LoadingController } from 'ionic-angular';
import { ProfileProvider } from '../../providers/profile/profile';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public userProfile: any;
  public birthDate: string;
  public loading: Loading;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public authProvider: AuthProvider, public profileProvider: ProfileProvider, public loadingCtrl: LoadingController) {

  }

  ionViewDidLoad() {
    let userProfile = this.profileProvider.getUserProfile();
    
    if (userProfile) {
      userProfile.on("value", user => {
        this.userProfile = user.val();
        this.birthDate = user.val().dateOfBirth;
      });
    }
  }

  logOut():void {
    this.authProvider.logoutUser().then(() => {
      this.loading.dismiss().then(() => {
        this.navCtrl.setRoot("LoginPage");
      });
    });

    this.loading = this.loadingCtrl.create({content: "Logging Out"});
    this.loading.present();
  }

  updateName():void {
    let alert = this.alertCtrl.create({
      message: "Change your name",
      inputs: [
        {
          name: "name",
          placeholder: "Your name",
          value: this.userProfile.displayName
        }
      ],
      buttons: [
        {
          text: "Save",
          handler: (data) => {
            this.profileProvider.updateName(data.name);
          }
        },
        {
          text: "Cancel",
          role: "cancel"
        }
      ]
    });

    alert.present();
  }

  updateDOB(birthDate: string):void {
    this.profileProvider.updateDOB(birthDate).then(() => {
      this.loading.dismiss();
    });

    this.loading = this.loadingCtrl.create({content: "Saving date of birth !"});
    this.loading.present();
  }

  updateEmail():void {
    let alert = this.alertCtrl.create({
      message: "Change your email",
      inputs: [
        {
          name: "email",
          type: "email",
          placeholder: "Your email",
        },
        {
          name: "password",
          type: "password",
          placeholder: "Your password"
        }
      ],
      buttons: [
        {
          text: "Save",
          handler: (data) => {
            this.profileProvider.updateEmail(data.email, data.password);
          }
        },
        {
          text: "Cancel",
          role: "cancel"
        }
      ]
    });

    alert.present();
  }

  updatePassword():void {
    let alert = this.alertCtrl.create({
      message: "Change your password",
      inputs: [
        {
          name: "newpassword",
          type: "password",
          placeholder: "Your new password"
        },
        {
          name: "oldpassword",
          type: "password",
          placeholder: "Your old password"
        }
      ],
      buttons: [
        {
          text: "Save",
          handler: (data) => {
            this.profileProvider.updatePassword(data.newpassword, data.oldpassword);
          }
        },
        {
          text: "Cancel",
          role: "cancel"
        }
      ]
    });

    alert.present();
  }
}