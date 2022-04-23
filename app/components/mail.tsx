import React from 'react';
import { observer } from 'mobx-react';
import MailWindowStore from 'app/stores/window/mail';

declare const YAHOO: any;

class MailWindow extends React.Component {
    render() {
        if (MailWindowStore.shown) {
            YAHOO.lacuna.Messaging.show();
        }

        return <div></div>;
    }
}

export default observer(MailWindow);
