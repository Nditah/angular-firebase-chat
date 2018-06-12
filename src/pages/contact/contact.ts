import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  user = {
    name: 'Grandilo Technology',
    description: 'We plan, design, implement and go on to maintain your projects',
    address: 'No 32, Barikisu Iyede Street, off Unilag road, Yaba, Lagos, Nigeria',
    phone: '234 700 732 2362 ',
    email: 'info@grandilo.com',
    whatsapp: '+2347039056183',
  };

  constructor(public navCtrl: NavController) {

  }

}
