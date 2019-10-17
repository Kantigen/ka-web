'use strict';

var PropTypes = require('prop-types');

var React = require('react');
var classnames = require('classnames');

var util = require('js/util');

class ResourceLine extends React.Component {
    static propTypes = {
        icon: PropTypes.string.isRequired,
        cost: PropTypes.number.isRequired,
        red: PropTypes.bool,
    };

    render() {
        var iconClass = classnames(this.props.icon, 'large icon', {
            red: this.props.red,
        });
        var content = util.reduceNumber(this.props.cost);
        var title = util.commify(this.props.cost);

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
                    title={title}
                >
                    {content}
                </span>
            </div>
        );
    }
}

module.exports = ResourceLine;
