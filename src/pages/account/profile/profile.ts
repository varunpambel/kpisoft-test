import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Platform } from 'ionic-angular';
import  firebase from 'firebase';
import { Auth } from '../../../providers/auth'
import { EditProfilePage } from '../edit-profile/edit-profile';
import { EmailComposer } from '@ionic-native/email-composer';
import { CallNumber } from '@ionic-native/call-number';
import { LoginPage } from '../login/login';
import { NativeStorage } from '@ionic-native/native-storage';
import { TranslateService } from '@ngx-translate/core';

declare var cordova: any;

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  
  currentUser: any;
  profile:any;
  UserList: any;
  user:any;
  language: any;
 
  constructor(public platform: Platform, public translateService: TranslateService, private nativeStorage: NativeStorage, private callNumber: CallNumber, private emailComposer: EmailComposer, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public auth: Auth) {
  	    this.language = this.auth.language;
  }

    ionViewWillEnter() {
     	  this.currentUser = firebase.auth().currentUser;
      	console.log(this.currentUser)
      	if(this.currentUser){
       	  this.auth.getUserProfile(this.currentUser.uid).on('value', (snapshot) =>{
           this.user = snapshot.val();
           console.log(this.user);
          });
        }
    }

    changeLanguage(language){
        this.auth.language = language;
        this.translateService.setDefaultLang(language);
        this.nativeStorage.setItem('lang', this.auth.language)
        .then(
          () => console.log(),
          error => console.error(error)
        );
    }

    edit(){
      let modal = this.modalCtrl.create(EditProfilePage, this.user);
          modal.present();
    }

    contact() {
        let email = {
            to: 'varunpambel@gmail.com',
            subject: '',
            body: '',
            isHtml: true
        };
        this.emailComposer.open(email);
    }

    call(){
      this.callNumber.callNumber('8970187053', true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
    }

    logout(){
        this.auth.logoutUser().then(() => {
        this.navCtrl.parent.select(0);
        this.auth.isLoggedIn = false;
        this.nativeStorage.remove('loginData');
        let modal = this.modalCtrl.create(LoginPage);
        modal.present();
        });;
    }

    login(){
      let modal = this.modalCtrl.create(LoginPage);
        modal.present();
    }
}
