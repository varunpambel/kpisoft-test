import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { EditProfilePage } from '../pages/account/edit-profile/edit-profile';
import { LoginPage } from '../pages/account/login/login';
import { ProfilePage } from '../pages/account/profile/profile';
import { RegisterPage } from '../pages/account/register/register';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Auth } from '../providers/auth';

import { AngularFireModule } from 'angularfire2';
import { config } from './app.firebaseconfig';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeStorage } from '@ionic-native/native-storage';
import { CallNumber } from '@ionic-native/call-number';
import { EmailComposer } from '@ionic-native/email-composer';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Camera, CameraOptions } from '@ionic-native/camera';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    EditProfilePage,
    LoginPage,
    HomePage,
    TabsPage,
    ProfilePage,
    RegisterPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(config),
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EditProfilePage,
    LoginPage,
    HomePage,
    TabsPage,
    ProfilePage,
    RegisterPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Auth,
    Geolocation,
    NativeStorage,
    EmailComposer,
    CallNumber,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
