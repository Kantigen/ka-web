import React from 'react';
import PropTypes from 'prop-types';

type Props = {
  endDate: string;
};

class CountdownTimer extends React.Component<Props> {
  static propTypes = {
    endDate: PropTypes.string,
  };

  render() {
    return <div>{this.props.endDate}</div>;
  }
}

export default CountdownTimer;
