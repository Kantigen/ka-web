import PropTypes from 'prop-types';

import React from 'react';
import _ from 'lodash';

type Props = {
  header: string;
  names: string[];
};

class CreditsSection extends React.Component<Props> {
  static propTypes = {
    header: PropTypes.string.isRequired,
    names: PropTypes.arrayOf(PropTypes.string),
  };

  static defaultProps = {
    header: '',
    names: [],
  };

  render() {
    return (
      <div className='block'>
        <div className='has-text-weight-bold mb-2'>{this.props.header}</div>

        <ul>
          {_.map(this.props.names, (name) => (
            <li
              key={name}
              style={{
                listStyleType: 'disc',
                marginLeft: '2em',
              }}
            >
              {name}
            </li>
          ))}
        </ul>

        <br />
      </div>
    );
  }
}

export default CreditsSection;
