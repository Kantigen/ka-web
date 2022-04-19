import React from 'react';
import { observer } from 'mobx-react';
import MailWindowStore from 'app/js/stores/window/mail';

class MailWindow extends React.Component {
    render() {
        if (MailWindowStore.shown) {
            YAHOO.lacuna.Messaging.show();
        }

        return <div></div>;
    }
}

export default observer(MailWindow);
