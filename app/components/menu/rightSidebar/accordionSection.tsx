import React from 'react';
import _ from 'lodash';
import AccordionItem from 'app/components/menu/rightSidebar/accordionItem';
import { BodiesList } from 'app/interfaces/empire';

type Props = {
  list: BodiesList[];
  title: string;
};

type State = {
  open: boolean;
};

class AccordionSection extends React.Component<Props, State> {
  state = {
    open: true,
  };

  showList() {
    this.setState({
      open: true,
    });
  }

  hideList() {
    this.setState({
      open: false,
    });
  }

  toggleList() {
    this.setState({
      open: !this.state.open,
    });
  }

  render() {
    return (
      <div style={{ marginBottom: '3em' }}>
        <div
          className='ui horizontal inverted divider'
          title={`Click to ${this.state.open ? 'hide' : 'show'} ${this.props.title.toLowerCase()}`}
          onClick={() => this.toggleList()}
          style={{ cursor: 'pointer' }}
        >
          {this.state.open ? <i className='angle down icon' /> : <i className='angle right icon' />}{' '}
          {this.props.title}
        </div>
        <div
          style={{
            display: this.state.open ? '' : 'none',
          }}
        >
          {_.map(this.props.list, (planet) => {
            return (
              <AccordionItem
                key={planet.id}
                name={planet.name}
                id={planet.id}
                zone={planet.zone}
                type={planet.type}
                orbit={planet.orbit}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default AccordionSection;
