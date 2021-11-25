'use strict';

var React = require('react');
var { observer } = require('mobx-react');
var _ = require('lodash');

var CreditsRPCStore = require('js/stores/rpc/stats/credits');
var StatsService = require('js/services/stats');

var CreditsSection = require('js/components/window/about/creditsSection');

class CreditsTab extends React.Component {
    componentDidMount() {
        StatsService.getCredits();
    }

    render() {
        return (
            <div>
                <h1>Credits</h1>

                {_.map(CreditsRPCStore.credits, function(names, header) {
                    return <CreditsSection key={header} header={header} names={names} />;
                })}
            </div>
        );
    }
}

module.exports = observer(CreditsTab);
