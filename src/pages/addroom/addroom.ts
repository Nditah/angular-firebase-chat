import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'Firebase';

@IonicPage()
@Component({
  selector: 'page-addroom',
  templateUrl: 'addroom.html',
})
export class AddroomPage {

 //  hold data object and Firebase database reference.

  data = { roomname:'' };
  ref = firebase.database().ref('chatrooms/');

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddroomPage');
  }
  
  // saving a new Room data to Firebase Database.

  addRoom() {
    let newData = this.ref.push();
    newData.set({
      roomname:this.data.roomname
    });
    this.navCtrl.pop();
  }

}
