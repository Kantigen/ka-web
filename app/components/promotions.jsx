import PropTypes from 'prop-types';

import React from 'react';
import createReactClass from 'create-react-class';
import _ from 'lodash';

import ServerRPCStore from 'app/stores/rpc/server';

class Promotion extends React.Component {
  static propTypes = {
    promotion: PropTypes.object.isRequired,
  };

  static defaultProps = {
    promotion: {},
  };

  render() {
    return (
      <div className='text item'>
        <h2>{this.props.promotion.header}</h2>

        {this.props.promotion.description}

        <br />
        <br />

        <span
          style={{
            textDecoration: 'underline',
          }}
        >
          Ends {this.props.promotion.ends}
        </span>
      </div>
    );
  }
}

const PromotionsWindow = createReactClass({
  displayName: 'PromotionsWindow',
  // mixins: [Reflux.connect(ServerRPCStore, 'server')],

  statics: {
    windowOptions: {
      title: 'Promotions',
      height: 'auto',
      width: 300,
    },
  },

  render() {
    return (
      <div
        className='ui vertical menu'
        style={{
          width: '100%',
        }}
      >
        {_.map(
          ServerRPCStore.promotions,
          (promotion) => (
            <Promotion promotion={promotion} />
          ),
          this
        )}
      </div>
    );
  },
});

export default PromotionsWindow;