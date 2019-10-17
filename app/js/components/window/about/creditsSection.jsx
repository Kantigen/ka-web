'use strict';

var PropTypes = require('prop-types');

var React = require('react');
var _ = require('lodash');

class CreditsSection extends React.Component {
    static propTypes = {
        header: PropTypes.string.isRequired,
        names: PropTypes.arrayOf(PropTypes.string),
    };

    static defaultProps = {
        header: '',
        names: [],
    };

    render() {
        return (
            <div>
                <strong>{this.props.header}</strong>

                <ul>
                    {_.map(this.props.names, function(name) {
                        return (
                            <li
                                key={name}
                                style={{
                                    listStyleType: 'disc',
                                    marginLeft: 40,
                                }}
                            >
                                {name}
                            </li>
                        );
                    })}
                </ul>

                <br />
            </div>
        );
    }
}

module.exports = CreditsSection;
