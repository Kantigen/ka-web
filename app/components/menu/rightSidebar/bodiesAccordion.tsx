import React from 'react';
import _ from 'lodash';
import AccordionSection from 'app/components/menu/rightSidebar/accordionSection';
import EmpireRPCStore from 'app/stores/rpc/empire';

class BodiesAccordion extends React.Component {
  render() {
    const items = [];

    if (EmpireRPCStore.bodies.colonies.length) {
      items.push(
        <AccordionSection
          title='My Colonies'
          key='My Colonies'
          list={EmpireRPCStore.bodies.colonies}
        />
      );
    }

    if (EmpireRPCStore.bodies.mystations.length) {
      items.push(
        <AccordionSection
          title='My Stations'
          key='My Stations'
          list={EmpireRPCStore.bodies.mystations}
        />
      );
    }

    if (EmpireRPCStore.bodies.ourstations.length) {
      items.push(
        <AccordionSection
          title='Our Stations'
          key='Our Stations'
          list={EmpireRPCStore.bodies.ourstations}
        />
      );
    }

    _.keys(EmpireRPCStore.bodies.babies).forEach((babyName) => {
      items.push(
        <AccordionSection
          title={`${babyName}'s Colonies`}
          list={EmpireRPCStore.bodies.babies[babyName].bodies}
          key={babyName}
        />
      );
    });

    return <div>{items}</div>;
  }
}

export default BodiesAccordion;
