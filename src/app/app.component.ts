import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/account/login/login';
import { NativeStorage } from '@ionic-native/native-storage';
import { Auth } from '../providers/auth';
import { Geolocation } from '@ionic-native/geolocation';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  currentUser: any;
  loading: any;

  constructor(public translateService: TranslateService, private geolocation: Geolocation, public loadingCtrl: LoadingController, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private nativeStorage: NativeStorage, public auth: Auth) {
    
    firebase.initializeApp({
    apiKey: "AIzaSyBvnu2wEi-Wri2om2YAWr0JZR_H8gAmHFE",
    authDomain: "myapp-a39f6.firebaseapp.com",
    databaseURL: "https://myapp-a39f6.firebaseio.com",
    projectId: "myapp-a39f6",
    storageBucket: "myapp-a39f6.appspot.com",
    messagingSenderId: "436426605130"
    });

    platform.ready().then(() => {

      this.translateService.setDefaultLang('english');
      this.auth.language = 'english';

      this.nativeStorage.getItem('lang').then(data => {
        this.auth.language = data;
        this.translateService.setDefaultLang(data);
        }, error => console.error(error));

      this.geolocation.getCurrentPosition().then((resp) => {
          this.auth.lat = resp.coords.latitude;
          this.auth.lng = resp.coords.longitude;
      }).catch((error) => {
      });

      this.nativeStorage.getItem('loginData')
          .then(data => {
            if(data){
                  this.loading = this.loadingCtrl.create({
                    content: "Please wait...",
                  });
                  this.loading.present();

                  this.auth.login(data.username, data.password).then((success) =>{
                  this.auth.isLoggedIn = true;
                  this.loading.dismiss();
                  this.nav.setRoot(TabsPage);
                }).catch(err => {
                  this.loading.dismiss();
                  this.nav.setRoot(LoginPage);
                  });
              }
            }
            , error => this.nav.setRoot(LoginPage));


      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
