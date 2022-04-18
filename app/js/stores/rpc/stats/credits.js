'use strict';

import { makeAutoObservable } from 'mobx';
import _ from 'lodash';
import server from 'app/js/server';

class CreditsRPCStore {
    credits = [];

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

    update(result) {
        var credits = {};

        _.each(result, function(foo) {
            _.each(foo, function(names, header) {
                credits[header] = names;
            });
        });

        this.credits = credits;
    }
}

export default new CreditsRPCStore();
