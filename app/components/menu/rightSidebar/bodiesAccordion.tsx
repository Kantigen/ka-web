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

    if (EmpireRPCStore.bodies.mystations?.length) {
      items.push(
        <AccordionSection
          title='My Stations'
          key='My Stations'
          list={EmpireRPCStore.bodies.mystations}
        />
      );
    }

    if (EmpireRPCStore.bodies.ourstations?.length) {
      items.push(
        <AccordionSection
          title='Our Stations'
          key='Our Stations'
          list={EmpireRPCStore.bodies.ourstations}
        />
      );
    }

    if (EmpireRPCStore.bodies.babies) {
      _.each(EmpireRPCStore.bodies.babies, (baby, empireName) => {
        items.push(
          <AccordionSection
            title={`${empireName}'s Colonies`}
            list={baby.bodies}
            key={empireName}
          />
        );
      });
    }

    return <div>{items}</div>;
  }
}

export default BodiesAccordion;
