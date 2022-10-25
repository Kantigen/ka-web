import React from 'react';
import { formatTime, serverDateToMoment } from 'app/util';

type Props = {
  endDate: string;
};

type State = {
  secondsRemaining: number;
};

class CountdownTimer extends React.Component<Props, State> {

  interval: any; // TODO: what type should this be?

  constructor(props: any) {
    super(props);
    this.state = {
      secondsRemaining: Math.floor(
        (serverDateToMoment(props.endDate).valueOf() - Date.now()) / 1000
      ),
    };
  }

  componentDidMount() {
    // TODO: subscribe to a global tick instead of duplicated local intervals
    this.interval = setInterval(() => {
      this.setState({ secondsRemaining: this.state.secondsRemaining - 1 });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return <>{formatTime(this.state.secondsRemaining)}</>;
  }
}

export default CountdownTimer;
