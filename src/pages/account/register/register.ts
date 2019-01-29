import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Auth } from '../../../providers/auth';
import firebase from 'firebase';
import { TranslateService } from '@ngx-translate/core';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

	form: any = {};
	disableRegister: boolean = false;
  buttonText: any = "SignUp";
  customerList: any;
  lan: any = {};

  constructor(private camera: Camera, public translate: TranslateService, public auth: Auth, public toastCtrl: ToastController, public nav: NavController) {
    	this.auth = auth;
    	this.customerList = firebase.database().ref('/User-List');
  }

  ngOnInit() {
    this.translate.get(['Please add a photo', 'Please enter firstname', 'Please enter middlename', 'Please enter country', 'Please enter state', 'Please enter city', 'Please enter phone', 'Please enter email', 'Confirm Password does not match!', 'Please enter lastname', 'Please enter middlename', 'Please enter lastname', 'Please enter username', 'Please enter password', 'Please confirm password']).subscribe(translations => {
            this.lan.AddAPhoto = translations['Please add a photo'];
            this.lan.EnterFirstname = translations['Please enter firstname'];
            this.lan.EnterMiddlename = translations['Please enter middlename'];
            this.lan.EnterLastname = translations['Please enter lastname'];
            this.lan.EnterUsername = translations['Please enter username'];
            this.lan.EnterPassword = translations['Please enter password'];
            this.lan.ConfirmPassword = translations['Please confirm password'];
            this.lan.PasswordDoesNotMatch = translations['Confirm Password does not match!'];
            this.lan.EnterEmail = translations['Please enter email'];
            this.lan.EnterPhone = translations['Please enter phone'];
            this.lan.EnterCity = translations['Please enter city'];
            this.lan.EnterState = translations['Please enter state'];
            this.lan.EnterCountry = translations['Please enter country'];
        })
  }

  register() {
      if(this.validateRegister()){
          this.disableRegister = true;
          this.buttonText = "Please wait...";
          this.auth.register(this.form.base64Image, this.form.firstname, this.form.middlename, this.form.lastname, this.form.username,  this.form.password, this.form.email, this.form.phone, this.form.city, this.form.state, this.form.country)
              .then(() => {
                this.disableRegister = false;
                this.buttonText = "SignUp";
                this.nav.pop();
              }).catch(err => {
                this.disableRegister = false;
                this.buttonText = "SignUp";
                this.handleRegisterError(err);
                });
      } 
  }

  handleRegisterError(err){
      this.disableRegister = false;
      this.buttonText = "SignUp";
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
        //imageData = imageData.
       this.form.base64Image ='data:image/jpeg;base64,' + imageData;
      }, (err) => {
       // Handle error
      });
  }

  presentToastAlert(alert) {
      let toast = this.toastCtrl.create({
          message: alert,
          duration: 2000,
           position: 'top'
      });
      toast.present();
  }

  validateRegister(){

    if(this.form.base64Image == undefined || this.form.base64Image == ''){
      this.presentToastAlert(this.lan.AddAPhoto);
      return false;
    }
  
    if(this.form.firstname == undefined || this.form.firstname == ''){
      this.presentToastAlert(this.lan.EnterFirstname);
      return false;
    }

    if(this.form.middlename == undefined || this.form.middlename == ''){
      this.presentToastAlert(this.lan.EnterMiddlename);
      return false;
    }

    if(this.form.lastname == undefined || this.form.lastname == ''){
      this.presentToastAlert(this.lan.EnterLastname);
      return false;
    }

    if(this.form.username == undefined || this.form.username == ''){
      this.presentToastAlert(this.lan.EnterUsername);
      return false;
    }

    if(this.form.password == undefined || this.form.password == ''){
      this.presentToastAlert(this.lan.EnterPassword);
      return false;
    }

    if(this.form.confirm_password == undefined || this.form.confirm_password == ''){
      this.presentToastAlert(this.lan.ConfirmPassword);
      return false;
    }

    if(this.form.password != this.form.confirm_password){
      this.presentToastAlert(this.lan.PasswordDoesNotMatch);
      return false;
    }

    if(this.form.email == undefined || this.form.email == ''){
      this.presentToastAlert(this.lan.EnterEmail);
      return false;
    }

    if(this.form.phone == undefined || this.form.phone == ''){
      this.presentToastAlert(this.lan.EnterPhone);
      return false;
    }

    if(this.form.city == undefined || this.form.city == ''){
      this.presentToastAlert(this.lan.EnterCity);
      return false;
    }

    if(this.form.state == undefined || this.form.state == ''){
      this.presentToastAlert(this.lan.EnterState);
      return false;
    }

    if(this.form.country == undefined || this.form.country == ''){
      this.presentToastAlert(this.lan.EnterCountry);
      return false;
    }
    return true;
  }


}
