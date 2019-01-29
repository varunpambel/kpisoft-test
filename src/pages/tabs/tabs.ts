import { Component } from '@angular/core';
import { ProfilePage } from '../account/profile/profile';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ProfilePage;

  constructor() {

  }

  home(ev: any) {
      if (ev.length() > 1) {
          ev.popToRoot();
      }
  }
}
