import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { SessionDetailPage } from '../session-detail/session-detail';


@Component({
  selector: 'page-participant-detail',
  templateUrl: 'participant-detail.html'
})
export class ParticipantDetailPage {
  participant: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.participant = this.navParams.data;
  }

  goToSessionDetail(session) {
    this.navCtrl.push(SessionDetailPage, session);
  }
}
