'use strict';

var vex = require('js/vex');

var PropTypes = require('prop-types');

var React = require('react');
var classnames = require('classnames');
var validator = require('validator');

var EmpireRPCActions = require('js/actions/rpc/empire');

var BoostCountdown = require('js/components/window/essentia/boostCountdown');

class Boost extends React.Component {
    static propTypes = {
        type: PropTypes.string.isRequired,
        iconName: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        essentia: PropTypes.number.isRequired,
        boosts: PropTypes.object.isRequired,
    };

    static defaultProps = {
        type: '',
        iconName: '',
        description: '',
    };

    handleBoost = () => {
        var type = this.props.type;
        var weeks = this.refs.weeks.value;

        if (
            !validator.isInt(weeks, {
                min: 1,
                max: 100, // The server has no max but this seems like a reasonable limit, to me.
            })
        ) {
            vex.alert('Number of weeks must be an integer between 1 and 100.');
            return;
        } else if (weeks * 5 > this.props.essentia) {
            vex.alert('Insufficient Essentia.');
            return;
        }
        EmpireRPCActions.requestEmpireRPCBoost({ type: type, weeks: weeks });
    };

    renderButton = () => {
        var iconClassName = classnames('icon', this.props.iconName);

        return (
            <div
                className='ui orange button'
                onClick={this.handleBoost}
                data-tip={this.props.description}
                data-place='top'
            >
                <i className={iconClassName}></i>
                Boost
            </div>
        );
    };

    render() {
        return (
            <div
                style={{
                    marginTop: 5,
                }}
            >
                <div className='ui action input'>
                    <input
                        type='text'
                        defaultValue='1'
                        ref='weeks'
                        title='Weeks to boost for'
                        disabled={this.props.essentia < 35}
                        style={{
                            width: 45,
                        }}
                    />

                    {this.renderButton()}
                </div>
                <BoostCountdown boost={this.props.boosts[this.props.type]} />
            </div>
        );
    }
}

module.exports = Boost;
