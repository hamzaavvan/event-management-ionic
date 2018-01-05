import { Component } from '@angular/core';
import { IonicPage, NavController, Alert, AlertController, Loading, LoadingController } from 'ionic-angular';
import { FormGroup, Validator, FormBuilder } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
import { Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
  public resetPasswordForm: FormGroup;
  public loading: Loading;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public authProvider: AuthProvider, formBuilder: FormBuilder) {
    this.resetPasswordForm = formBuilder.group({
      email: [
        '', Validators.compose([Validators.required, EmailValidator.isValid])
      ]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }

  resetPassword(): void {
    if (!this.resetPasswordForm.valid) {
      console.log(
        `Form is not valid yet, current value: ${this.resetPasswordForm.value}`
      );
    } else {
      const email: string = this.resetPasswordForm.value.email;

      this.authProvider.resetPassword(email).then(user => {
        this.loading.dismiss().then(() => {
          const alert: Alert = this.alertCtrl.create({
            message: "Please check your email for a password reset link",
            buttons: [
              {
                text: "Ok",
                role: "cancel",
                handler: () => {
                  this.navCtrl.pop();
                }
              }
            ]
          });

          alert.present();
        });
      }, error => {
        const errorAlert = this.alertCtrl.create({
          message: error.message,
          buttons: [{text: "Ok", role: "cancel"}]
        });

        this.loading.dismiss();
        errorAlert.present();
      });

      this.loading = this.loadingCtrl.create({content: "Sending reset link !"});
      this.loading.present();
    }
  }

}
