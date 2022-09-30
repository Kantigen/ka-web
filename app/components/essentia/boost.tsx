import React from 'react';
import { observer } from 'mobx-react';
import classnames from 'classnames';
import EmpireRPCStore from 'app/stores/rpc/empire';
import * as util from 'app/util';
import Icon from 'app/components/menu/icon';
import { IconStyle } from 'app/interfaces/menu/icons';
import EmpireService from 'app/services/empire';
import { int } from 'app/util';

type Props = {
  type: string;
  iconStyle: IconStyle;
  description: string;
  ms: number;
};

class Boost extends React.Component<Props> {
  weeks = React.createRef<HTMLInputElement>();

  handleBoost() {
    const { type } = this.props;
    const weeks = int(this.weeks?.current?.value || 0);

    console.log(`Boosting ${type} for ${weeks} weeks`);

    EmpireService.setBoost(type, weeks);
  }

  tagClassNames() {
    if (this.props.ms > 0) {
      const day = 1000 * 60 * 60 * 24; // Milliseconds per day

      // Change the color of the tags as the countdown gets closer to zero.
      return classnames('ui left pointing label', {
        green: this.props.ms > 3 * day, // More than three days
        yellow: 3 * day > this.props.ms && this.props.ms > day, // Less than three days and more than one day
        red: day > this.props.ms, // Less than one day
      });
    }
  }

  render() {
    return (
      <div
        style={{
          marginTop: 5,
        }}
      >
        <div className='ui action input'>
          <input
            type='text'
            defaultValue='1'
            ref={this.weeks}
            title='Weeks to boost for'
            disabled={EmpireRPCStore.essentia < 35}
            style={{
              width: 45,
            }}
          />

          <div
            className='ui orange button'
            onClick={() => this.handleBoost()}
            title={this.props.description}
          >
            <Icon style={this.props.iconStyle} />
            Boost
          </div>
        </div>
        {this.props.ms > 0 ? (
          <div className={this.tagClassNames()}>{util.formatMillisecondTime(this.props.ms)}</div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default observer(Boost);
