import { makeAutoObservable } from 'mobx';
import _ from 'lodash';
import { StatsCreditsResult } from 'app/interfaces';

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

  update(result: StatsCreditsResult) {
    const credits: Credits = {};

    _.each(result, (block) => {
      _.each(block, (names, header) => {
        credits[header] = names;
      });
    });

    this.credits = credits;
  }
}

export default new CreditsRPCStore();
