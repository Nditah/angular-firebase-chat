import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth";
import { GooglePlus } from "@ionic-native/google-plus";

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from './../pages/login/login';
import { HallPage } from './../pages/hall/hall';
import { RoomPage } from './../pages/room/room';
import { AddroomPage } from './../pages/addroom/addroom';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NetworkProvider } from '../providers/network/network';
import { Network } from '@ionic-native/network';

const firebaseConfig = {
  apiKey: "AIzaSyBmVtVf0Txg5K-6lRG_-atC8sRVsI8MHWE",
  authDomain: "grandilo-chatting.firebaseapp.com",
  databaseURL: "https://grandilo-chatting.firebaseio.com",
  projectId: "grandilo-chatting",
  storageBucket: "grandilo-chatting.appspot.com",
  messagingSenderId: "453284584780"
}

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    RoomPage,
    AddroomPage,
    HallPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig), 
    AngularFireAuthModule,
    HttpModule,
    HttpClientModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    HallPage,
    RoomPage,
    AddroomPage,
    TabsPage
  ],
  providers: [
    GooglePlus,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpClientModule, HttpModule,
    Network,
    NetworkProvider
  ]
})
export class AppModule {}
