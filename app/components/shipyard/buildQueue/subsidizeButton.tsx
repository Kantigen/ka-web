import { Building } from 'app/interfaces/building';
import { FleetBeingWorkedOn } from 'app/interfaces/shipyard';
import React from 'react';

type Props = {
  obj: FleetBeingWorkedOn;
  building: Building;
};

class SubsidizeButton extends React.Component<Props> {
  render() {
    return (
      <div>
        <div className='ui green button'>Subsidize, 23E</div>
      </div>
    );
  }
}

export default SubsidizeButton;
