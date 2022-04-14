'use strict';

var React = require('react');
var PropTypes = require('prop-types');

var PlanetDetailLine = require('js/components/window/planetPanel/line');

var constants = require('js/constants');
class PlanetOre extends React.Component {
    static propTypes = {
        status: PropTypes.object.isRequired,
    };

    render() {
        var ores = constants.ORES;
        var bodyOre = this.props.status.ore;

        var renderOres = [];
        for (var prop in ores) {
            if (ores.hasOwnProperty(prop)) {
                renderOres.push(
                    <PlanetDetailLine title={ores[prop]} value={bodyOre[prop]} key={ores[prop]} />
                );
            }
        }

        return (
            <div className='ui grid'>
                <div className='sixteen wide column'>{renderOres}</div>
            </div>
        );
    }
}

module.exports = PlanetOre;
