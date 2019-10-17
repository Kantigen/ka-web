'use strict';

var React = require('react');
var createReactClass = require('create-react-class');
var Reflux = require('reflux');
var _ = require('lodash');

var CreditsStatsRPCStore = require('js/stores/rpc/stats/credits');

var CreditsSection = require('js/components/window/about/creditsSection');

var CreditsTab = createReactClass({
    displayName: 'CreditsTab',
    mixins: [Reflux.connect(CreditsStatsRPCStore, 'creditsStatsRPC')],

    render: function() {
        return (
            <div>
                <h1>Credits</h1>

                {_.map(this.state.creditsStatsRPC, function(names, header) {
                    return (
                        <CreditsSection
                            key={header}
                            header={header}
                            names={names}
                        />
                    );
                })}
            </div>
        );
    },
});

module.exports = CreditsTab;
