import React from 'react';
import { Tabber } from 'app/components/tabber';
import SendFleetsTab from 'app/components/starPanel/sendFleetsTab';
import { StarInfoWindowOptions } from 'app/interfaces/window';
import environment from 'app/environment';

type Props = {
  options: StarInfoWindowOptions;
};

class StarPanel extends React.Component<Props> {
  render() {
    return (
      <>
        <div className='bulma'>
          <div className='columns is-vcentered mx-4 mb-2'>
            <div className='column is-one-quarter'>
              <div
                className='columns is-centered is-vcentered'
                style={{
                  backgroundImage: `url(${environment.getAssetsUrl()}star_system/field.png)`,
                  borderRadius: 5,
                }}
              >
                <img
                  src={`${environment.getAssetsUrl()}star_map/${this.props.options.color}.png`}
                  style={{width: 100, height: 100 }}
                />
              </div>
            </div>

            <div className='column'>
              <h1 className='title is-size-5 mb-2'>
                {this.props.options.name}
              </h1>

              <div className='mb-2'>
                <ul>
                  <li><strong>X: </strong> {this.props.options.x}</li>
                  <li><strong>Y: </strong> {this.props.options.y}</li>
                  <li><strong>Zone: </strong> {this.props.options.zone}</li>
                  <li><strong>Star ID: </strong> {this.props.options.id}</li>
                  <li><strong>Net Influence: </strong> {this.props.options.influence}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <Tabber
          tabs={[
            {
              title: 'Send',
              component: () => <SendFleetsTab options={this.props.options} />,
            },
            {
              title: 'Foreign Fleets',
              component: () => <p>Not Yet Implemented</p>,
            },
            {
              title: 'Unavailable',
              component: () => <p>Not Yet Implemented</p>,
            },
            {
              title: 'Incoming',
              component: () => <p>Not Yet Implemented</p>,
            },
            {
              title: 'Laws',
              component: () => <p>Not Yet Implemented</p>,
            },
          ]}
        />
      </>
    );
  }
}

export default StarPanel;
