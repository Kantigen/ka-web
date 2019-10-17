'use strict';

var PropTypes = require('prop-types');

var React = require('react');

var util = require('js/util');

class SpyTrainingStatus extends React.Component {
    static propTypes = {
        inTraining: PropTypes.number.isRequired,
        pointsPerHour: PropTypes.number.isRequired,
        maxPoints: PropTypes.number.isRequired,
    };

    render() {
        return (
            <div className='ui teal labels'>
                <div className='ui label'>
                    Spies in training
                    <div className='detail'>{this.props.inTraining}</div>
                </div>

                <div className='ui label'>
                    Points / hr
                    <div className='detail'>{this.props.pointsPerHour}</div>
                </div>

                <div className='ui label'>
                    Points / hr / training spy
                    <div className='detail'>
                        {this.props.inTraining > 0
                            ? util.int(
                                  this.props.pointsPerHour /
                                      this.props.inTraining
                              )
                            : 0}
                    </div>
                </div>

                <div className='ui label'>
                    Maximum points
                    <div className='detail'>{this.props.maxPoints}</div>
                </div>
            </div>
        );
    }
}

module.exports = SpyTrainingStatus;
