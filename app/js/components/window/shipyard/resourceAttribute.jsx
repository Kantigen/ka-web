'use strict';

var PropTypes = require('prop-types');

var React = require('react');

var util = require('js/util');

class ResourceAttribute extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        attr: PropTypes.number.isRequired,
    };

    render() {
        var title = this.props.attr;

        if (!window.isNaN(title)) {
            title = util.commify(title);
        }

        return (
            <div
                style={{
                    marginTop: 5,
                }}
            >
                <span>{this.props.name}</span>
                <span
                    style={{
                        float: 'right',
                    }}
                    title={title}
                >
                    {title}
                </span>
            </div>
        );
    }
}

module.exports = ResourceAttribute;
