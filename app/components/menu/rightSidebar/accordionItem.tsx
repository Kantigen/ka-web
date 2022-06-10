import React from 'react';
import _ from 'lodash';
import PlanetListItem from 'app/components/menu/rightSidebar/planetListItem';

type Props = {
  list: any;
  currentBody: number;
  title: string;
};

type State = {
  open: boolean;
};

class AccordionItem extends React.Component<Props, State> {
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
              <PlanetListItem
                key={planet.id}
                name={planet.name}
                id={planet.id}
                zone={planet.zone}
                currentBody={this.props.currentBody}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default AccordionItem;
