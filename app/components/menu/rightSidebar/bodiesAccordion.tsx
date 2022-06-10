import React from 'react';
import _ from 'lodash';
import AccordionItem from 'app/components/menu/rightSidebar/accordionItem';
import EmpireRPCStore from 'app/stores/rpc/empire';

type Props = {
  currentBody: number;
};

type IAccordionItem = {
  title: string;
  key: string;
  initiallyOpen: boolean;
  isBaby: boolean;
};

class BodiesAccordion extends React.Component<Props> {
  render() {
    const items: IAccordionItem[] = [
      {
        title: 'My Colonies',
        key: 'colonies',
        initiallyOpen: true,
        isBaby: false,
      },
      {
        title: 'My Stations',
        key: 'mystations',
        initiallyOpen: true,
        isBaby: false,
      },
      {
        title: 'Our Stations',
        key: 'ourstations',
        initiallyOpen: true,
        isBaby: false,
      },
    ];

    // Handle all the babies.
    _.chain(EmpireRPCStore.bodies.babies || {})
      .keys()
      .sortBy()
      .each((babyName) => {
        items.push({
          title: `${babyName}'s Colonies`,
          key: babyName,
          initiallyOpen: true,
          isBaby: true,
        });
      })
      .value();

    return (
      <div>
        {_.map(items, (item) => {
          let list = [];

          if (item.isBaby) {
            list = _.values(EmpireRPCStore.bodies.babies[item.key].planets) || [];
          } else {
            list = _.values(EmpireRPCStore.bodies[item.key]) || [];
          }

          if (list.length > 0) {
            return (
              <AccordionItem
                title={item.title}
                list={list}
                initiallyOpen={item.initiallyOpen}
                currentBody={this.props.currentBody}
                key={item.title}
              />
            );
          }
        })}
      </div>
    );
  }
}

export default BodiesAccordion;
