import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Loading, LoadingController } from 'ionic-angular';
import { Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public signupForm: FormGroup;
  public loading: Loading;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public authProvider: AuthProvider, formBuilder: FormBuilder) {
      this.signupForm = formBuilder.group({
        "name": [
          '', Validators.compose([Validators.required, Validators.maxLength(15)])
        ],
        "email": [
          '', Validators.compose([Validators.required, EmailValidator.isValid])
        ],
        "password": [
          '', Validators.compose([Validators.required, Validators.minLength(6)])
        ]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signupUser() {
    if (!this.signupForm.valid) {
      console.log(
        `Need to complete the form, current value: ${this.signupForm.value}`
        );
    } else {
      const name: string = this.signupForm.value.name;
      const email: string = this.signupForm.value.email;
      const password: string = this.signupForm.value.password;

      this.authProvider.signupUser(name, email, password).then(user => {
        this.loading.dismiss().then(() => {
          this.navCtrl.setRoot(HomePage);
        });
      }, error => {
        this.loading.dismiss().then(() => {
          const alert: Alert = this.alertCtrl.create({
            message: error.message,
            buttons: [{text: "Ok", role: "cancel"}]
          });

          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create({content: "Signing Up"});
      this.loading.present();
    }
  }
}
