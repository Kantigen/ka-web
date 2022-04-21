import * as vex from 'app/js/vex';

import PropTypes from 'prop-types';

import React from 'react';
import { observer } from 'mobx-react';
import classnames from 'classnames';
import validator from 'validator';
import EmpireRPCStore from 'app/js/stores/rpc/empire';
import * as util from 'app/js/util';

class Boost extends React.Component {
    static propTypes = {
        type: PropTypes.string.isRequired,
        iconName: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        ms: PropTypes.number.isRequired,
    };

    static defaultProps = {
        type: '',
        iconName: '',
        description: '',
        ms: 0,
    };

    handleBoost = () => {
        let type = this.props.type;
        let weeks = this.refs.weeks.value;

        if (
            !validator.isInt(weeks, {
                min: 1,
                max: 100, // The server has no max but this seems like a reasonable limit, to me.
            })
        ) {
            vex.alert('Number of weeks must be an integer between 1 and 100.');
            return;
        } else if (weeks * 5 > EmpireRPCStore.essentia) {
            vex.alert('Insufficient Essentia.');
            return;
        }
        EmpireRPCActions.requestEmpireRPCBoost({ type: type, weeks: weeks });
    };

    renderButton = () => {
        let iconClassName = classnames('icon', this.props.iconName);

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

    tagClassNames() {
        if (this.props.ms > 0) {
            let day = 1000 * 60 * 60 * 24; // Milliseconds per day

            // Change the color of the tags as the countdown gets closer to zero.
            return classnames('ui left pointing label', {
                green: this.props.ms > 3 * day, // More than three days
                yellow: 3 * day > this.props.ms && this.props.ms > day, // Less than three days and more than one day
                red: day > this.props.ms, // Less than one day
            });
        }
    }

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
                        disabled={EmpireRPCStore.essentia < 35}
                        style={{
                            width: 45,
                        }}
                    />

                    {this.renderButton()}
                </div>
                {this.props.ms > 0 ? (
                    <div className={this.tagClassNames()}>
                        {util.formatMillisecondTime(this.props.ms)}
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        );
    }
}

export default observer(Boost);
