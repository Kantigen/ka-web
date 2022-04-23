import PropTypes from 'prop-types';
import React from 'react';

class Line extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    };

    render() {
        return (
            <div>
                {this.props.title}:
                <span
                    style={{
                        float: 'right',
                    }}
                >
                    {this.props.value}
                </span>
            </div>
        );
    }
}

export default Line;
