import { Component } from '@angular/core';

import { ActionSheet, ActionSheetController, Config, NavController } from 'ionic-angular';
// import { InAppBrowser } from 'ionic-native';

import { ConferenceData } from '../../providers/conference-data';
import { SessionDetailPage } from '../session-detail/session-detail';
import { ParticipantDetailPage } from '../participant-detail/participant-detail';


@Component({
  selector: 'page-participant-list',
  templateUrl: 'participant-list.html'
})
export class ParticipantListPage {
  actionSheet: ActionSheet;
  Participants = [];

  constructor(public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, public confData: ConferenceData, public config: Config) {
    confData.getSpeakers().then(Participants => {
      this.Participants = Participants;
    });
  }

  goToSessionDetail(session) {
    this.navCtrl.push(SessionDetailPage, session);
  }

  goToParticipantDetail(ParticipantName: string) {
    this.navCtrl.push(ParticipantDetailPage, ParticipantName);
  }

  goToParticipantTwitter(participant) {
    // TODO FIX
    // let app = new InAppBrowser(`https://twitter.com/${participant.twitter}`, '_blank');
    // app.on('loadstop').subscribe(
    //   (ev) => {
    //     console.log('InAppBrowser loaded!');
    //   });
  }

  openParticipantShare(participant) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Share ' + participant.name,
      buttons: [
        {
          text: 'Copy Link',
          handler: () => {
            console.log('Copy link clicked on https://twitter.com/' + participant.twitter);
            if (window['cordova'] && window['cordova'].plugins.clipboard) {
              window['cordova'].plugins.clipboard.copy('https://twitter.com/' + participant.twitter);
            }
          }
        },
        {
          text: 'Share via ...',
          handler: () => {
            console.log('Share via clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }

  openContact(participant) {
    let mode = this.config.get('mode');

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Contact with ' + participant.name,
      buttons: [
        {
          text: `Email ( ${participant.email} )`,
          icon: mode !== 'ios' ? 'mail' : null,
          handler: () => {
            window.open('mailto:' + participant.email);
          }
        },
        {
          text: `Call ( ${participant.phone} )`,
          icon: mode !== 'ios' ? 'call' : null,
          handler: () => {
            window.open('tel:' + participant.phone);
          }
        }
      ]
    });

    actionSheet.present();
  }
}
