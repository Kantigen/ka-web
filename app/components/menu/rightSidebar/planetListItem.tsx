import React from 'react';
import MenuStore from 'app/stores/menu';
import classNames from 'classnames';

declare const YAHOO: any;

type Props = {
  name: string;
  id: number;
  currentBody: number;
  zone: string;
};

class PlanetListItem extends React.Component<Props> {
  // Returns true if this list item is the the currently selected planet.
  isCurrentWorld() {
    return this.props.currentBody === this.props.id;
  }

  handleClick() {
    MenuStore.hideRightSidebar();

    if (this.isCurrentWorld()) {
      YAHOO.lacuna.MapPlanet.Refresh();
    } else {
      MenuStore.changePlanet(this.props.id);
    }
  }

  render() {
    return (
      <a
        className={classNames({
          'ui large teal label': this.isCurrentWorld(),
          item: !this.isCurrentWorld(),
        })}
        onClick={() => this.handleClick()}
        style={{
          // For some reason this doesn't get set on the items (by Semantic) when it should.
          cursor: 'pointer',
          textDecoration: 'none',
        }}
      >
        {this.props.name} ({this.props.zone})
      </a>
    );
  }
}

export default PlanetListItem;
