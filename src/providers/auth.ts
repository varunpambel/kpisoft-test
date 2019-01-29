import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import firebase from 'firebase';
import { NativeStorage } from '@ionic-native/native-storage';
import { Platform } from 'ionic-angular';

@Injectable()
export class Auth {

	public fireAuth : any;
  public UserList:any;
  avatar: any = "assets/images/person.png";
  customerId: any;
  profile: any;
  lat: any;
  lng: any;
  language: any;
  isLoggedIn: boolean = false;
  
  constructor(public platform: Platform, private nativeStorage: NativeStorage) {

    platform.ready().then(() => {
        this.fireAuth = firebase.auth(); 
        this.UserList = firebase.database().ref('/UserList');
        console.log(this.UserList);
    });
  }

  login(email: String, password: String){
  	return this.fireAuth.signInWithEmailAndPassword(email,password);
  }

  register(base64Image: String, firstname: String, middlename:String, lastname:String, username: String,  password: String, email: String, phone: String, city: String, state: String, country: String){
  	return this.fireAuth.createUserWithEmailAndPassword(email, password)
  	.then((newUser) =>{
  		this.UserList.child(newUser.user.uid).set({
        base64Image: base64Image,
        firstname: firstname,
        middlename: middlename,
        lastname: lastname,
        username: username,
        email: email,
        phone: phone,
        city: city,
        state: state,
        country: country,
        });

      this.nativeStorage.setItem('login', {email: email, password: password})
        .then(
          () => console.log('Stored item!'),
          error => console.error('Error storing item', error)
      );


  	});
  }

  saveCustomer(base64Image: String, firstname: String, middlename:String, lastname:String, username: String,  password: String, email: String, phone: String, city: String, state: String, country: String){
    return this.UserList.child(this.customerId).update({
        base64Image: base64Image,
        firstname: firstname,
        middlename: middlename,
        lastname: lastname,
        username: username,
        email: email,
        phone: phone,
        city: city,
        state: state,
        country: country
    });
  }

  getUserProfile(id){
    return this.UserList.child(id);
  }

  logoutUser(): any{
    return this.fireAuth.signOut();
  }


}
