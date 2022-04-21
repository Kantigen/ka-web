import PropTypes from 'prop-types';

import React from 'react';
import classnames from 'classnames';

import * as util from 'app/js/util';

class ResourceToolTip extends React.Component {
    static propTypes = {
        body: PropTypes.object.isRequired,
        type: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        children: PropTypes.node,
    };

    getResourceStatus = (hour, stored, capicity, hasCapicity) => {
        // Different players have differnet strategies regarding waste. Some would consider full
        // waste good. Some would consider empty waste good. Therefore, we shouldn't comment
        // on what a player does or does not do with their waste.
        if (this.props.type === 'waste') {
            return '';
        }

        if (stored === capicity) {
            return (
                <div>
                    <i className='large green thumbs up icon'></i>
                    Full
                </div>
            );
        } else if (hour < 0 && stored > 0) {
            return (
                <div>
                    <i className='large red warning circle icon'></i>
                    Empty in {util.formatTime((-3600 * stored) / hour)}
                </div>
            );
        } else if (hour > 0 && stored > 0 && hasCapicity) {
            return (
                <div>
                    <i className='large wait icon'></i>
                    Full in {util.formatTime((3600 * (capicity - stored)) / hour)}
                </div>
            );
        } else if (hour > 0 && stored > 0 && !hasCapicity) {
            return (
                <div>
                    <i className='large green thumbs up icon'></i>
                    Going up
                </div>
            );
        } else {
            return (
                <div>
                    <i className='large red warning circle icon'></i>
                    <strong>Danger!</strong>
                </div>
            );
        }
    };

    render() {
        let body = this.props.body;

        let hour = body[this.props.type + '_hour'];
        let stored = body[this.props.type + '_stored'] || body[this.props.type] || 0;
        let capicity = body[this.props.type + '_capacity'];

        // Some resources (happiness) do not have a storage limit.
        let hasCapicity = typeof capicity !== 'undefined';

        return (
            <div
                style={{
                    lineHeight: '2em',
                }}
            >
                <div
                    style={{
                        textAlign: 'center',
                    }}
                >
                    <strong>{this.props.title}</strong>
                </div>

                <div>
                    <i className={classnames(this.props.icon, 'large icon')}></i>
                    {util.commify(stored)} {hasCapicity ? ' / ' + util.commify(capicity) : ''}
                </div>

                <div>
                    <i className='at large icon'></i>
                    {util.commify(hour)} / hr
                </div>

                {this.props.children}

                {this.getResourceStatus(hour, stored, capicity, hasCapicity)}
            </div>
        );
    }
}

export default ResourceToolTip;
