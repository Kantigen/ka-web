import React from 'react';
import { observer } from 'mobx-react';
import OptionsWindowStore from 'app/stores/window/options';

declare const YAHOO: any;

class OptionsWindow extends React.Component {
    render() {
        if (OptionsWindowStore.shown) {
            YAHOO.lacuna.Profile.show();
        }

        return <div></div>;
    }
}

export default observer(OptionsWindow);
