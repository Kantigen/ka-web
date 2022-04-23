import React from 'react';
import PropTypes from 'prop-types';

export interface TabProps {
    title: string;
    onSelect?: Function;
    children: React.ReactNode;
}

export default class Tab extends React.Component<TabProps> {
    static propTypes = {
        title: PropTypes.string.isRequired,
        children: PropTypes.node,
        onSelect: PropTypes.object,
    };

    render() {
        // This is a dummy component. Everything passed into here is read by the parent `Tabs`
        // and handled accordingly.
        return null;
    }
}
