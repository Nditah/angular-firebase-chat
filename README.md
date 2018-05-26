
## angular-firebase-chat
A Chat app developed with Angular 5 and Firebase with Google Authentication

# Tools
$ cordova -v
> 7.1.0
$ ionic -v
> 3.19.1
$ npm -v
> 6.0.1
$ node -v
> v10.1.0

# 1-Setup Firebase
Go to https://console.firebase.google.com and log in using your google account.
Click create a new project

Go to Develop menu then choose Database and click Get Started button. 
Click RULES tab then edit to make your database writable and readable for everyone 

# 2-Create a New Ionic 3, Angular 5 and Cordova App
To create a new Ionic 3, Angular 5 and Cordova app, type this command.

> ionic start fire-chat blank
You will see this output, then type `Y` for including Cordova to the app creation.

> ✔ Creating directory ./fire-chat - done!
> ✔ Downloading and extracting blank starter - done!

? Would you like to integrate your new app with Cordova to target native iOS and Android? (y/N)
Just wait for few minutes because it will also install NPM modules. Next, go to the newly created app folder.

> cd ./fire-chat
For sanitizing, run the app on the browser for the first time to make sure everything working properly.

> ionic serve -l
And you will see this landing page of Ionic 3 and Angular 5 app.

# 3- Install and Configure Firebase Module
Firebase library ship with NPM module. For that, type this command to install the module.``

> npm install --save firebase@4.8.0
Register the Firebase module in the Ionic 3 Angular 5 app by open and edit this file `src/app.component.ts` then add this import.

> import * as firebase from ‘firebase’;
Declare a constant variable 'const config' for holds Firebase setting before `@Component`.

Add this line inside the constructor for running the Firebase configuration.

>  firebase.initializeApp(config);
Now, Firebase database is ready to populate.

4. Create Sign-in or Enter Nickname Page
To add a new page for sign in or enter a nickname, run this command.

> ionic g page Signin
That command will create a new page bundle contains HTML, TS and SCSS files. Next, open and edit `src/pages/signin/signin.ts` then add this import.

import { RoomPage } from  '../room/room';
That import declares `RoomPage` that will add later. Now, add this variable before the constructor for hold sign in data.

> data = { nickname:"" };
Create this function for Sign In or Enter the Room using a specific nickname.

enterNickname() {
  this.navCtrl.setRoot(RoomPage, {
    nickname: this.data.nickname
  });
}
Open and edit `src/pages/signin/signin.html` the login form

5. Create Room List and Add-Room Page
To add a new page for Room list and `add-room`, type this command.

ionic g page Room
ionic g page AddRoom
Open and edit `src/pages/room/room.ts` then add these imports
...
import { AddRoomPage } from '../add-room/add-room';
import { HomePage } from '../home/home';
import * as firebase from 'Firebase';
Declare variables before the constructor for hold room list and referencing Firebase database.

rooms = [];
ref = firebase.database().ref('chatrooms/');
Add this Firebase function inside the constructor to listening any value changes from Firebase Database.

Add this constant function below the Class block for converting Firebase response to an array.

> export const snapshotToArray = snapshot => {};

Add this function under the constructor for navigating to `add-room` page.

> addRoom() 
Add this function for join or navigating to Home Page of selected Room.

> joinRoom(key) 
Now, open and edit `src/pages/room/room.html` 
Next, open and edit `src/pages/add-room/add-room.ts` then add imports :

> import * as firebase from 'Firebase';
Declare these variables before the constructor for hold data object and Firebase database reference.

> data = { roomname:'' };
> ref = firebase.database().ref('chatrooms/');
Add this function to the constructor for saving a new Room data to Firebase Database.

> addRoom() 

Now, open and edit `src/pages/add-room/add-room.html` 

6. Modify Home Page as Chat Page
Finally, we just need to modify existing Home Page for Chat page. 
Open and edit `src/pages/home/home.ts` then add

import { RoomPage } from '../room/room';
import * as firebase from 'Firebase';
Declare content module on the first line of the Class block.

@ViewChild(Content) content: Content;
Following by add these variables for hold data object, chats array, room key, nickname and status for sign out.

data = { type:'', nickname:'', message:'' };
chats = [];
roomkey:string;
nickname:string;
offStatus:boolean = false;

Update  the constructor body.
Create a function for sending a message that actually saves message data to Firebase database as room child.

> sendMessage()
Create function for exit or sign out from the current chat room. This also sends the message for exit status to Firebase database.

> exitChat() 
Next, add this constant function after the Class body for converting Firebase response to an array.

export const snapshotToArray = snapshot => {};
Now, open and edit `src/pages/home/home.html` 
To make your chat page more stylish, open and edit `src/pages/home/home.scss`
Add a chat-backgroung.png image inside your assets/imgs  

*NB 
Change rootPage at app.Component.ts value rootPage:any = SigninPage; and import SigninPage
Add SigninPage, RoomPage, AddRoomPage to entryComponents in app.module.ts

7. Run the Firebase Chat App on The Devices
This time to run the Ionic 3, Angular 5 and Firebase Chat app on the real devices. 
Before that remove/add the Cordova platform first.

 For iOS devices
> ionic cordova platform rm ios
> ionic cordova platform add ios


 For Android devices
> ionic cordova platform rm android
> ionic cordova platform add android

Now, run to the device by type this command.

> ionic cordova run android
or
> ionic cordova run ios


# Integrate Google Authentication
1. Google API Setup
The first thing to setup from Google is generating configuration files for iOS and Android.
https://developers.google.com/mobile/add?platform=ios&cntapi=signin




# Future Features
Conversations
Contacts
Chat
Profile
Settings
Intro
image url/style Sanitizer pipe
simple line icons
elastic textarea directive
keyboard-attach
