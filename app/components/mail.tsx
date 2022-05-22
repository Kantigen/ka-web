import React from 'react';
import { observer } from 'mobx-react';
import MailWindowStore from 'app/stores/window/mail';

import YAHOO from 'app/shims/yahoo';

class MailWindow extends React.Component {
  render() {
    if (MailWindowStore.shown) {
      YAHOO.lacuna.Messaging.show();
    }

    return <div />;
  }
}

export default observer(MailWindow);
