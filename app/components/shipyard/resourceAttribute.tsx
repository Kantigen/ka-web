import React from 'react';
import * as util from 'app/util';

type Props = {
  name: string;
  attr: string | number;
}

class ResourceAttribute extends React.Component<Props> {
  render() {
    const { name, attr } = this.props;

    return (
      <div style={{ marginTop: 5 }}>
        <span>{name}</span>
        <span style={{ float: 'right' }} title={String(attr)}>
          {typeof attr === 'number' ? util.commify(attr) : attr}
        </span>
      </div>
    );
  }
}

export default ResourceAttribute;
