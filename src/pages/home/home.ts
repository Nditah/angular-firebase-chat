import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { RoomPage } from '../room/room';
import * as firebase from 'Firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  @ViewChild(Content) content: Content;

  data = { type: '', displayName: '', message: '' };
  chats = [];
  roomkey: string;
  displayName: string;
  offStatus: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.roomkey = this.navParams.get("key") as string;
    this.displayName = this.navParams.get("displayName") as string;
    this.data.type = 'message';
    this.data.displayName = this.displayName;

    let joinData = firebase.database().ref('chatrooms/' + this.roomkey + '/chats').push();
    joinData.set({
      type: 'join',
      user: this.displayName,
      message: this.displayName + ' has joined this room.',
      sendDate: Date()
    });
    this.data.message = '';

    firebase.database().ref('chatrooms/' + this.roomkey + '/chats').on('value', resp => {
      this.chats = [];
      this.chats = snapshotToArray(resp);
      setTimeout(() => {
        if (this.offStatus === false) {
          this.content.scrollToBottom(300);
        }
      }, 1000);
    });
  }

  // function for sending a message that actually saves message data to Firebase database as room child.

  sendMessage() {
    let newData = firebase.database().ref('chatrooms/' + this.roomkey + '/chats').push();
    newData.set({
      type: this.data.type,
      user: this.data.displayName,
      message: this.data.message,
      sendDate: Date()
    });
    this.data.message = '';
  }

  //  function for exit or sign out from the current chat room. 
  // This also sends the message for exit status to Firebase database.

  exitChat() {
    let exitData = firebase.database().ref('chatrooms/' + this.roomkey + '/chats').push();
    exitData.set({
      type: 'exit',
      user: this.displayName,
      message: this.displayName + ' has exited this room.',
      sendDate: Date()
    });

    this.offStatus = true;

    this.navCtrl.setRoot(RoomPage, {
      displayName: this.displayName
    });
  }

}

// constant function for converting Firebase response to an array.

export const snapshotToArray = snapshot => {
    let returnArr = [];

    snapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
    });

    return returnArr;
};
