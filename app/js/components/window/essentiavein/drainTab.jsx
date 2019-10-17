'use strict';

var PropTypes = require('prop-types');

var React = require('react');
var _ = require('lodash');

var EssentiaVeinRPCActions = require('js/actions/rpc/essentiaVein');

class DrainTab extends React.Component {
    static propTypes = {
        building: PropTypes.object.isRequired,
    };

    componentDidMount() {
        $(this.refs.dropdown).dropdown();
    }

    handleDrain = () => {
        var times =
            parseInt($(this.refs.dropdown).dropdown('get value'), 10) / 30;
        var id = this.props.building.id;

        EssentiaVeinRPCActions.requestEssentiaVeinRPCDrain({
            id: id,
            times: times,
        });
    };

    render() {
        return (
            <div>
                Drain{' '}
                <div className='ui inline dropdown' ref='dropdown'>
                    <div className='text'>30 days</div>
                    <i className='dropdown icon'></i>
                    <div className='menu'>
                        {_.times(this.props.building.drain_capable, function(
                            num
                        ) {
                            // Num starts on 0.
                            num += 1;

                            var days = num * 30;
                            var str = days + ' days';

                            return (
                                <div
                                    className='item'
                                    data-text={str}
                                    key={days}
                                >
                                    {days}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className='ui green button' onClick={this.handleDrain}>
                    Drain
                </div>
            </div>
        );
    }
}

module.exports = DrainTab;
