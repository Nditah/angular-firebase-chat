import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { NetworkInterface } from '@ionic-native/network-interface';
import * as firebase from "firebase/app";
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Observable";
import { AlertController } from 'ionic-angular';
import { GooglePlus } from "@ionic-native/google-plus";
import { Platform } from "ionic-angular";
import { RoomPage } from '../room/room';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [GooglePlus]
})
export class LoginPage {

  user: Observable<firebase.User>;

  userInfo = { uid: "", name: "", displayName:"", email: "", phone: "", photo: "" };


  constructor(private network: Network,
              private networkInterface: NetworkInterface,
              private alertCtrl: AlertController,
              private afAuth: AngularFireAuth,
              private googlePlus: GooglePlus, 
              private platform: Platform,
              public navCtrl: NavController, 
              public navParams: NavParams) {

        this.getUserInfo();
        this.netAlert()
        this.netStatusOn()
        this.netStatusOff()

  }

  netAlert(){
    this.alertCtrl.create({
    title: "Connection Failed !",
    subTitle: "There may be a problem in your internet connection. Please try again ! ",
    buttons: [{ text: ("Okay") }]
  });
  } 

   // watch network for a connection
   netStatusOn() {
     this.network.onConnect().subscribe(() => {
    console.log('network connected!');
    // We just got a connection but we need to wait briefly
    // before we determine the connection type. Might need to wait.
    // prior to doing any api requests as well.
    setTimeout(() => {
      if (this.network.type === 'wifi') {
        console.log('we got a wifi connection, woohoo!');
      }
    }, 3000);
  }); 
   }  

  netStatusOff() {
    this.network.onDisconnect().subscribe(() => {
    console.log('network was disconnected :-(');
  });
  }
  // Login Function 

  googleLogin() {
    if(!this.getUserInfo()){
      if (this.platform.is('cordova')) {
        this.nativeGoogleLogic();
        console.log(this.nativeGoogleLogic());
      } else {
        this.webGoogleLogin();
      }      
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
    localStorage.removeItem('userInfo')
    this.userInfo = { uid: "", name: "", displayName:"", email: "", phone: "", photo: "" };
  }

  enterDisplayname() {
    this.navCtrl.setRoot(RoomPage, {
      displayName: this.userInfo.displayName
    });
  }

  getUserInfo(): boolean { 
    try{
      if (localStorage.getItem('userInfo') !== null) {
        // Retrieve userInfo
        this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
        console.log(`userInfo: ${JSON.stringify(this.userInfo)}`);
        return true;
      } else {
        console.log("userInfo not found in localStorage goto Google Auth")
        this.user = this.afAuth.authState;
      }
    } catch (err) {
      throw err
    }
    return false;
  }



}
