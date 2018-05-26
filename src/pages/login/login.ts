import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import * as firebase from "firebase/app";
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Observable";
import { AlertController } from 'ionic-angular';

import { GooglePlus } from "@ionic-native/google-plus";
import { Platform } from "ionic-angular";
import { HallPage } from '../hall/hall';
import { RoomPage } from '../room/room';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [GooglePlus]
})
export class LoginPage {

  /*
this.network.onDisconnect().subscribe(() => {
    let alert = this.alertCtrl.create({
      title: "Connection Failed !",
      subTitle: "There may be a problem in your internet connection. Please try again ! ",
      buttons: [{ text: ("Okay") }]
    });
    alert.present();
    });

     (<any>window).networkinterface.getWiFiIPAddress((ip) => {
     console.log("network ip address = " + ip);
    });
*/
    
  user: Observable<firebase.User>;
  userInfo = { uid: "", name: "", displayName:"", email: "", phone: "", photo: "" };

  constructor(public network: Network,
              private alertCtrl: AlertController,
              private afAuth: AngularFireAuth,
              private googlePlus: GooglePlus, 
              private platform: Platform,
              public navCtrl: NavController, 
              public navParams: NavParams) {

    this.getUserInfo();
    this.user = this.afAuth.authState;
  }

  // Login Function 

  googleLogin() {
    if (this.platform.is('cordova')) {
      this.nativeGoogleLogic();
      console.log(this.nativeGoogleLogic());
    } else {
      this.webGoogleLogin();
    }

  }


  async nativeGoogleLogic(): Promise<void> {
    try {
      const googlePlusUser = await this.googlePlus.login({
        'webClientId': '453284584780-f5ad8qu16gf4nf6kjaiuevrh9eo3nk7p.apps.googleusercontent.com',
        'offline': true,
        'scopes': 'profile email'
      });

      if (googlePlusUser.user.uid != null) {
        //convert  an observale to an object
        /* */
        this.userInfo.uid = googlePlusUser.user.uid;
        this.userInfo.name = googlePlusUser.user.displayName;
        this.userInfo.displayName = googlePlusUser.user.displayName;
        this.userInfo.email = googlePlusUser.user.email;
        this.userInfo.phone = googlePlusUser.user.phoneNumber;
        this.userInfo.photo = googlePlusUser.user.photoURL;

        localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
        console.log("From googlePlusUser 66 " + JSON.stringify(googlePlusUser));
        /*
          if (localStorage.getItem("userInfo")) {
            this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
          }  
      */
      }

      return await this.afAuth.auth.signInWithCredential(
        firebase.auth.GoogleAuthProvider.credential(googlePlusUser.idToken)
      )
    } catch (err) {
      console.log(err)
    }

  }


  async webGoogleLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider);

      if (credential.user.uid != null) {
        //convert  an observale to an object
        /* */
        this.userInfo.uid = credential.user.uid;
        this.userInfo.name = credential.user.displayName;
        this.userInfo.displayName = credential.user.displayName;
        this.userInfo.email = credential.user.email;
        this.userInfo.phone = credential.user.phoneNumber;
        this.userInfo.photo = credential.user.photoURL;

        localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
      }
    } catch (err) {
      console.log(err)
    }

  }


  signOut() {
    // console.log(this.user);
    this.afAuth.auth.signOut();
    if (this.platform.is('cordova')) {
      this.googlePlus.logout();
    }
    localStorage.setItem('userInfo', null);
  }

  enterDisplayname() {
    this.navCtrl.setRoot(RoomPage, {
      displayName: this.userInfo.displayName
    });
  }

  getUserInfo(): void { 
    if (localStorage.getItem('userInfo') === "undefined" || localStorage.getItem('userInfo') === null) {
      //Go to login
    } else {
      // Login
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
      console.log(this.userInfo);
    }
  }



}
