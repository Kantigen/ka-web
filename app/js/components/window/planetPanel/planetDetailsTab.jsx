'use strict';

var React = require('react');
var PropTypes = require('prop-types');

var PlanetDetails = require('app/js/components/window/planetPanel/planetDetails');
var PlanetOre = require('app/js/components/window/planetPanel/planetOre');

class PlanetDetailsTab extends React.Component {
    static propTypes = {
        status: PropTypes.object.isRequired,
    };

    render() {
        return (
            <div className='ui grid'>
                <div className='ui centered row'>
                    <div className='nine wide column'>
                        <div
                            style={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                            }}
                        >
                            Planet Details
                        </div>
                    </div>
                    <div className='seven wide column'>
                        <div
                            style={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                            }}
                        >
                            Ore
                        </div>
                    </div>
                </div>

                <div className='ui centered row'>
                    <div className='nine wide column'>
                        <PlanetDetails status={this.props.status} />
                    </div>
                    <div className='seven wide column'>
                        <PlanetOre status={this.props.status} />
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = PlanetDetailsTab;
