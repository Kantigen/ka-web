import { makeAutoObservable } from 'mobx';
import _ from 'lodash';

interface Credits {
  [index: string]: string[];
}

class CreditsRPCStore {
  credits: Credits = {};

  constructor() {
    makeAutoObservable(this);
  }

  // INPUT:
  //
  // [
  //     { 'Game Server' : ['JT Smith']},
  //     { 'iPhone Client' : ['Kevin Runde']},
  //     { 'Web Client' : ['John Rozeske']},
  //     { 'Play Testers' : ['John Ottinger', 'Jamie Vrbsky']}
  // ]
  //
  // OUTPUT
  // {
  //     'Game Server': ['JT Smith'],
  //     'iPhone Client': ['Kevin Runde'],
  //     'Web Client' : ['John Rozeske'],
  //     'Play Testers' : ['John Ottinger', 'Jamie Vrbsky']
  // }

  update(result: any) {
    const credits: Credits = {};

    _.each(result, (foo) => {
      _.each(foo, (names, header) => {
        credits[header] = names;
      });
    });

    this.credits = credits;
  }
}

export default new CreditsRPCStore();
