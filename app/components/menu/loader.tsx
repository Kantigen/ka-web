import React from 'react';
import { observer } from 'mobx-react';
import MenuStore from 'app/stores/menu';

import classnames from 'classnames';

class Loader extends React.Component {
  render() {
    return (
      <div
        className={classnames('ui large loader', {
          active: MenuStore.loaderShown,
        })}
        style={{
          zIndex: 9999999999,
          top: '40vh',
        }}
      />
    );
  }
}

export default observer(Loader);
