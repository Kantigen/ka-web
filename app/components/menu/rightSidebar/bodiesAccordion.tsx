import React from 'react';
import _ from 'lodash';
import AccordionItem from 'app/components/menu/rightSidebar/accordionItem';
import EmpireRPCStore from 'app/stores/rpc/empire';

type Props = {
  currentBody: number;
};

class BodiesAccordion extends React.Component<Props> {
  render() {
    const items = [];

    if (EmpireRPCStore.bodies.colonies.length) {
      items.push(
        <AccordionItem
          title='My Colonies'
          key='My Colonies'
          list={EmpireRPCStore.bodies.colonies}
          currentBody={this.props.currentBody}
        />
      );
    }

    if (EmpireRPCStore.bodies.mystations.length) {
      items.push(
        <AccordionItem
          title='My Stations'
          key='My Stations'
          list={EmpireRPCStore.bodies.mystations}
          currentBody={this.props.currentBody}
        />
      );
    }

    if (EmpireRPCStore.bodies.ourstations.length) {
      items.push(
        <AccordionItem
          title='Our Stations'
          key='Our Stations'
          list={EmpireRPCStore.bodies.ourstations}
          currentBody={this.props.currentBody}
        />
      );
    }

    _.keys(EmpireRPCStore.bodies.babies).forEach((babyName) => {
      items.push(
        <AccordionItem
          title={`${babyName}'s Colonies`}
          list={EmpireRPCStore.bodies.babies[babyName].planets}
          key={babyName}
          currentBody={this.props.currentBody}
        />
      );
    });

    return <div>{items}</div>;
  }
}

export default BodiesAccordion;
