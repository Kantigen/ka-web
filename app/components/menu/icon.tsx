import React from 'react';
import _ from 'lodash';
import environment from 'app/environment';
import { IconStyle, IconSize } from 'app/interfaces/menu/icons';
import * as util from 'app/util';

type Props = {
  style: IconStyle;
  size?: IconSize;
};

class Icon extends React.Component<Props> {
  render() {
    const { style } = this.props;
    const size = this.props.size || 'small';

    return (
      <img
        src={`${environment.getAssetsUrl()}ui/${size === 'large' ? 'l' : 's'}/${style}.png`}
        style={{ maxHeight: 36, margin: 2 }}
        className='ui image'
        title={util.humanize(style)}
        alt={util.humanize(style) + ' Icon'}
      />
    );
  }
}

export default Icon;
