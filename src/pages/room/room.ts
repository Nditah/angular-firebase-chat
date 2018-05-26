import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddroomPage } from '../addroom/addroom';
import { HomePage } from '../home/home';
import * as firebase from 'Firebase';

@IonicPage()
@Component({
  selector: 'page-room',
  templateUrl: 'room.html',
})
export class RoomPage  {

  // hold room list and referencing Firebase database.
  rooms = [];
  ref = firebase.database().ref('chatrooms/');

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.ref.on('value', resp => {
      this.rooms = [];
      this.rooms = snapshotToArray(resp);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomPage');
  }


  // navigating to `add-room` page.
  addRoom() {
    this.navCtrl.push(AddroomPage);
  }

  // join or navigating to Home Page of selected Room.
  joinRoom(key) {
    this.navCtrl.setRoot(HomePage, {
      key:key,
      displayName:this.navParams.get("displayName")
    });
  }

} // end class 

// converting Firebase response to an array.
export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
};