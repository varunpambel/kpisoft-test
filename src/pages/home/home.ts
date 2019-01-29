import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions} from '@ionic-native/google-maps';
import { Auth } from '../../providers/auth';

declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
    @ViewChild('mapCanvas') mapElement: ElementRef;
    map: GoogleMap;  
    marker: any;
    GoogleAutocomplete: any;
    geocoder: any;

    constructor(private platform: Platform, public navCtrl: NavController, public auth: Auth) {

    platform.ready().then(() => {
          let mapOptions: GoogleMapOptions = {
              camera: {
                  target: {
                      lat: this.auth.lat,
                      lng: this.auth.lng
                  },
                  zoom: 12,
                  tilt: 30
              }
          };
          this.map = GoogleMaps.create('map_canvas', mapOptions);
          
          this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
              console.log('Map is ready!');
              this.map.addMarker({
                  title: 'My Location',
                  animation: 'DROP',
                  draggable: true,
                  position: {
                      lat: this.auth.lat,
                      lng: this.auth.lng
                  }
              }).then(marker => {
                  this.marker = marker;
              });
          });
          this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
          this.geocoder = new google.maps.Geocoder;
    });
  }
}
