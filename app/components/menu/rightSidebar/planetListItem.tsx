import React from 'react';
import MenuStore from 'app/stores/menu';
import classNames from 'classnames';
import environment from 'app/environment';

declare const YAHOO: any;

type Props = {
  name: string;
  id: number;
  currentBody: number;
  zone: string;
  type: string;
  orbit: number;
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
          'ui large teal label full-width': this.isCurrentWorld(),
          item: !this.isCurrentWorld(),
        })}
        onClick={() => this.handleClick()}
        style={{
          // For some reason this doesn't get set on the items (by Semantic) when it should.
          cursor: 'pointer',
          textDecoration: 'none',
        }}
      >
        <img
          alt={`${this.props.name} Planet Image`}
          className='ui image'
          style={{ height: '2em', display: 'inline', marginRight: 5 }}
          src={`${environment.getAssetsUrl()}star_system/${this.props.type}-${
            this.props.orbit
          }.png`}
        />{' '}
        {this.props.name} ({this.props.zone})
      </a>
    );
  }
}

export default PlanetListItem;
