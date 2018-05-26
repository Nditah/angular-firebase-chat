import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

import { Network } from '@ionic-native/network';
import { NetworkProvider } from '../providers/network/network';
import { AlertController, Events } from 'ionic-angular';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage; 

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public events: Events,
    private alertCtrl: AlertController,
    public network: Network,
    public networkProvider: NetworkProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      //this.initializeApp();
    });
  }

  initializeApp() {
      this.networkProvider.initializeNetworkEvents();

      // Offline event
      this.events.subscribe('network:offline', () => {
        let alert = this.alertCtrl.create({
          title: "Connection Failed !",
          subTitle: "There may be a problem in your internet connection. Please try again ! ",
          buttons: [{ text: ("Okay") }]
        });
        // 'network:offline ==> ' + this.network.type
        alert.present();

      });

      // Online event
      this.events.subscribe('network:online', () => {
        alert('network:online ==> ' + this.network.type);
      });
  }


}
