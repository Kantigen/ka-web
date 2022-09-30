import React from 'react';
import _ from 'lodash';
import $ from 'app/shims/jquery';
import { Building } from 'app/interfaces';
import EssentiaVein from 'app/services/essentiaVein';
import * as vex from 'app/vex';

type Props = {
  building: Building;
};

class DrainTab extends React.Component<Props> {
  dropdown = React.createRef<HTMLSelectElement>();

  componentDidMount() {
    $(this.dropdown.current).dropdown();
  }

  async handleDrain() {
    const times = parseInt($(this.dropdown.current).dropdown('get value'), 10) / 30;
    const { id } = this.props.building;

    console.assert(typeof times === 'number', 'times should be a number');

    const res = await EssentiaVein.drain(id, times);
    if (res) {
      vex.alert('Drain successful');
    }
  }

  render() {
    if (this.props.building.drain_capable) {
      return (
        <div>
          Drain{' '}
          <select ref={this.dropdown}>
            {_.times(this.props.building.drain_capable, (num) => {
              // Num starts on 0.
              num += 1;
              const days = num * 30;

              return (
                <option value={days} key={days}>
                  {days} days
                </option>
              );
            })}
          </select>
          <div className='ui green button' onClick={() => this.handleDrain()}>
            Drain
          </div>
        </div>
      );
    }
    return <></>;
  }
}

export default DrainTab;
