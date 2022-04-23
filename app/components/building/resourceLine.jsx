import PropTypes from 'prop-types';

import React from 'react';
import classnames from 'classnames';

class ResourceLine extends React.Component {
    static propTypes = {
        icon: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        red: PropTypes.bool,
        content: PropTypes.string,
    };

    render() {
        let iconClass = classnames(this.props.icon, 'large icon', {
            red: this.props.red,
        });

        return (
            <div
                style={{
                    marginTop: 5,
                }}
            >
                <i className={iconClass}></i>
                <span
                    style={{
                        float: 'right',
                        color: this.props.red ? 'red' : 'white',
                    }}
                    title={this.props.title}
                >
                    {this.props.content}
                </span>
            </div>
        );
    }
}

export default ResourceLine;
