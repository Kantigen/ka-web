'use strict';

var React = require('react');
var PropTypes = require('prop-types');

var PlanetPanelLine = require('js/components/window/planetPanel/line');

var constants = require('js/constants');

class PlanetDetails extends React.Component {
    static propTypes = {
        status: PropTypes.object.isRequired,
    };

    render() {
        var bodyStatus = this.props.status;
        var location = bodyStatus.x + 'x : ' + bodyStatus.y + 'y';

        return (
            <div className='ui grid'>
                <div className='five wide column'>
                    <img
                        src={
                            constants.ASSETS_URL +
                            'star_system/' +
                            bodyStatus.image +
                            '-' +
                            bodyStatus.orbit +
                            '.png'
                        }
                        style={{
                            width: 100,
                            height: 100,
                        }}
                    />
                </div>
                <div className='eleven wide column'>
                    <PlanetPanelLine title='Name' value={bodyStatus.name} />
                    <PlanetPanelLine title='Type' value={bodyStatus.type} />
                    <PlanetPanelLine title='Empire' value='' />
                    <PlanetPanelLine title='Water' value={bodyStatus.water} />
                    <PlanetPanelLine title='Planet Size' value={bodyStatus.size} />
                    <PlanetPanelLine title='Location' value={location} />
                    <PlanetPanelLine title='Zone' value={bodyStatus.zone} />
                    <PlanetPanelLine title='Body ID' value={bodyStatus.id} />
                    <PlanetPanelLine
                        title='Star'
                        value={bodyStatus.star_name + '(ID: ' + bodyStatus.star_id + ')'}
                    />
                    <PlanetPanelLine title='Orbit' value={bodyStatus.orbit} />
                </div>
            </div>
        );
    }
}

module.exports = PlanetDetails;
