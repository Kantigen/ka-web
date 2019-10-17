'use strict';

var PropTypes = require('prop-types');

var React = require('react');

var ResourceLine = require('js/components/window/shipyard/resourceLine');
var ResourceAttribute = require('js/components/window/shipyard/resourceAttribute');
var BuildButton = require('js/components/window/shipyard/buildFleet/button');

var constants = require('js/constants');

class BuildFleetItem extends React.Component {
    static propTypes = {
        fleetType: PropTypes.string.isRequired,
        obj: PropTypes.object.isRequired,
        buildingId: PropTypes.number.isRequired,
        autoSelect: PropTypes.string.isRequired,
    };

    handleQuantity = (o) => {};

    render() {
        var starfieldStyle = {
            width: 100,
            height: 100,
            background:
                'transparent url(' +
                constants.ASSETS_URL +
                'star_system/field.png) no-repeat center',
        };

        var obj = this.props.obj;
        var shipImage =
            constants.ASSETS_URL + 'ships/' + this.props.fleetType + '.png';
        var reason = '';
        var canBuild = 1;

        if (obj.reason) {
            reason = obj.reason[1];
            canBuild = 0;
        }

        return (
            <div>
                <div className='ui grid'>
                    <div className='four wide column'>
                        <div>{obj.type_human}</div>
                        <div style={starfieldStyle}>
                            <img
                                src={shipImage}
                                style={{
                                    width: 100,
                                    height: 100,
                                }}
                                className='shipImage'
                            />
                        </div>
                    </div>

                    <div className='four wide column'>
                        <ResourceLine icon={'food'} cost={obj.cost.food} />
                        <ResourceLine icon={'diamond'} cost={obj.cost.ore} />
                        <ResourceLine icon={'theme'} cost={obj.cost.water} />
                        <ResourceLine
                            icon={'lightning'}
                            cost={obj.cost.energy}
                        />
                        <ResourceLine icon={'wait'} cost={obj.cost.time} />
                    </div>

                    <div className='four wide column'>
                        <ResourceAttribute
                            name={'Speed'}
                            attr={obj.attributes.speed}
                        />
                        <ResourceAttribute
                            name={'Berth Level'}
                            attr={obj.attributes.berth_level}
                        />
                        <ResourceAttribute
                            name={'Hold Size'}
                            attr={obj.attributes.hold_size}
                        />
                        <ResourceAttribute
                            name={'Max Occupants'}
                            attr={obj.attributes.max_occupants}
                        />
                        <ResourceAttribute
                            name={'Combat'}
                            attr={obj.attributes.combat}
                        />
                        <ResourceAttribute
                            name={'Stealth'}
                            attr={obj.attributes.stealth}
                        />
                    </div>

                    <div className='four wide column'>
                        <BuildButton
                            canBuild={canBuild}
                            obj={obj}
                            buildingId={this.props.buildingId}
                            fleetType={this.props.fleetType}
                            autoSelect={this.props.autoSelect}
                        />
                    </div>

                    <div className='sixteen wide column'>
                        <span
                            style={{
                                float: 'right',
                                color: 'red',
                            }}
                            title={reason}
                        >
                            {reason}
                        </span>
                    </div>
                </div>
                <div className='ui divider' />
            </div>
        );
    }
}

module.exports = BuildFleetItem;
