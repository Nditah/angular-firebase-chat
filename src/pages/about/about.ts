import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  text = "About Grandilo Chat";
  logo = ""; 

  constructor(public navCtrl: NavController) {

  }

}
