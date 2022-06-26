import React from 'react';
import { observer } from 'mobx-react';
import MailWindowStore from 'app/stores/window/mail';

import YAHOO from 'app/shims/yahoo';

class MailWindow extends React.Component {
  componentDidUpdate() {
    if (MailWindowStore.shown) {
      YAHOO.lacuna.Messaging.show();
    }
  }

  render() {
    const { shown } = MailWindowStore;
    return <div />;
  }
}

export default observer(MailWindow);
