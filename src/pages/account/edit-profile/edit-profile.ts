import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import  firebase from 'firebase';
import { Auth } from '../../../providers/auth';
import { TranslateService } from '@ngx-translate/core';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  currentUser: any;
  errorMessage: any;
  user: any;
  lan: any = {};
  loading: any;
  buttonText: any = 'Save';
  disableSave: boolean = false;

  constructor(private camera: Camera, public toastCtrl: ToastController, public translate: TranslateService, public nav: NavController, public params: NavParams, public auth: Auth ) {
  	this.user = {};
    this.currentUser = firebase.auth().currentUser;
    this.auth.customerId = this.currentUser.uid;
    this.user = params.data;
  }

  ngOnInit() {
    this.translate.get(['Please add a photo', 'Please enter firstname', 'Please enter middlename', 'Please enter country', 'Please enter state', 'Please enter city', 'Please enter phone', 'Please enter lastname', 'Please enter middlename', 'Please enter lastname', 'Please enter username']).subscribe(translations => {
            this.lan.EnterFirstname = translations['Please enter firstname'];
            this.lan.EnterMiddlename = translations['Please enter middlename'];
            this.lan.EnterLastname = translations['Please enter lastname'];
            this.lan.EnterUsername = translations['Please enter username'];
            this.lan.EnterPhone = translations['Please enter phone'];
            this.lan.EnterCity = translations['Please enter city'];
            this.lan.EnterState = translations['Please enter state'];
            this.lan.EnterCountry = translations['Please enter country'];
            this.lan.AddAPhoto = translations['Please add a photo'];
        })
  }

  saveAddress(){
    if(this.validateUser()){
      this.buttonText = 'Saving';
      this.disableSave = true;

      this.auth.saveCustomer(this.user.base64Image, this.user.firstname, this.user.middlename, this.user.lastname, this.user.username,  this.user.password, this.user.email, this.user.phone, this.user.city, this.user.state, this.user.country)
      .then(() =>{
      this.buttonText = 'Save';
      this.disableSave = false;

        this.nav.pop();
      }).catch(err => {
                this.buttonText = 'Save';
                this.disableSave = false;

                this.handleError(err);
                });
    }
  }

  handleError(err){
    this.buttonText = 'Save';
    this.disableSave = false;

    if(err.code){
        this.presentToastAlert(err.message);
    }
  }

  photo(){
     const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }

      this.camera.getPicture(options).then((imageData) => {
       // imageData is either a base64 encoded string or a file URI
       // If it's base64 (DATA_URL):
       this.user.base64Image = '';
       this.user.base64Image ='data:image/jpeg;base64,' + imageData;
      }, (err) => {
       // Handle error
      });
  }

  dismiss(){
    this.nav.pop();
  }

  validateUser(){

    if(this.user.base64Image == undefined || this.user.base64Image == ''){
      this.presentToastAlert(this.lan.AddAPhoto);
      return false;
    }
  
    if(this.user.firstname == undefined || this.user.firstname == ''){
      this.presentToastAlert(this.lan.EnterFirstname);
      return false;
    }

    if(this.user.middlename == undefined || this.user.middlename == ''){
      this.presentToastAlert(this.lan.EnterMiddlename);
      return false;
    }

    if(this.user.lastname == undefined || this.user.lastname == ''){
      this.presentToastAlert(this.lan.EnterLastname);
      return false;
    }

    if(this.user.username == undefined || this.user.username == ''){
      this.presentToastAlert(this.lan.EnterUsername);
      return false;
    }

    if(this.user.email == undefined || this.user.email == ''){
      this.presentToastAlert(this.lan.EnterEmail);
      return false;
    }

    if(this.user.phone == undefined || this.user.phone == ''){
      this.presentToastAlert(this.lan.EnterPhone);
      return false;
    }

    if(this.user.city == undefined || this.user.city == ''){
      this.presentToastAlert(this.lan.EnterCity);
      return false;
    }

    if(this.user.state == undefined || this.user.state == ''){
      this.presentToastAlert(this.lan.EnterState);
      return false;
    }

    if(this.user.country == undefined || this.user.country == ''){
      this.presentToastAlert(this.lan.EnterCountry);
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

}
