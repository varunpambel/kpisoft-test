import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Auth } from '../../../providers/auth';
import { TabsPage } from '../../tabs/tabs';
import { RegisterPage } from '../register/register';
import { NativeStorage } from '@ionic-native/native-storage';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	form: any = {};
	disableLogin: boolean = false;
  showPasswordEnable: boolean = false;
  disableSubmit: boolean = false;
  LogIn = "Login";
  lan: any = {};
  language: any;
  constructor(public translate: TranslateService, public toastCtrl: ToastController, public auth: Auth, public nav: NavController, public navParams: NavParams, private nativeStorage: NativeStorage) {
  this.language = this.auth.language;
  }

  ngOnInit() {
    this.translate.get(['Please enter email', 'Please enter password']).subscribe(translations => {
            this.lan.EenterEmail = translations['Please enter email'];
            this.lan.EnterPassword = translations['Please enter password'];
        })
  }

  signup(){
    this.nav.push(RegisterPage);
  }

  changeLanguage(language){
      this.auth.language = language;
      this.translate.setDefaultLang(language);
      this.nativeStorage.setItem('lang', this.auth.language)
      .then(
        () => console.log(),
        error => console.error(error)
      );
  }

  login(){
    if(this.validate()){
      this.disableSubmit = true;
      this.LogIn = "Please wait";
        this.auth.login(this.form.email, this.form.password).then((success) =>{
          this.disableSubmit = false;
          this.LogIn = "Login";
          this.auth.isLoggedIn = true;

          this.nativeStorage.setItem('loginData', {
              username: this.form.email,
              password: this.form.password
          }).then(data => console.log('Login Details Stored'), error => console.error(error));
          
          this.nav.setRoot(TabsPage);
        }).catch(err => {
          this.disableSubmit = false;
          this.LogIn = "Login";
          this.handleError(err);
      });
      }
  }

  handleError(err){
        console.log(err.code);
        this.disableSubmit = false;
        if(err.code){
            this.presentToastAlert(err.message);
        }
  }

  validate(){
    if(this.form.email == undefined || this.form.email == ''){
      this.presentToastAlert(this.lan.EenterEmail);
      return false;
    }
    if(this.form.password == undefined || this.form.password == ''){
      this.presentToastAlert(this.lan.EnterPassword);
      return false;
    }
    return true;
  }

  presentToastAlert(alert) {
      let toast = this.toastCtrl.create({
          message: alert,
          duration: 2000,
           position: 'top'
      });
      toast.present();
  }

  showPassword(){
    this.showPasswordEnable = true; 
  }
  
  hidePassword(){
    this.showPasswordEnable = false; 
  }

}
