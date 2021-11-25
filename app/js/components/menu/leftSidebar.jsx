'use strict';

var React = require('react');
const { observer } = require('mobx-react');

var vex = require('js/vex');
var util = require('js/util');

var MenuStore = require('js/stores/menu');
var EmpireRPCStore = require('js/stores/rpc/empire');
var WindowsStore = require('js/stores/windows');

// Because there's a bit of special logic going on here, this is in a separate component.
const SelfDestruct = observer(
    class SelfDestruct extends React.Component {
        handleDestructClick() {
            MenuStore.hideLeftSidebar();

            if (EmpireRPCStore.self_destruct_active === 1) {
                EmpireRPCActions.requestEmpireRPCDisableSelfDestruct();
                return;
            }

            vex.confirm(
                'Are you ABSOLUTELY sure you want to enable self destruct?  If enabled, your empire will be deleted after 24 hours.',
                EmpireRPCActions.requestEmpireRPCEnableSelfDestruct
            );
        }

        render() {
            var destructMs = EmpireRPCStore.self_destruct_ms;
            var destructActive = EmpireRPCStore.self_destruct_active && destructMs > 0;
            var formattedDestructMs = destructActive ? util.formatMillisecondTime(destructMs) : '';

            var itemStyle = destructActive
                ? {
                      color: 'red',
                  }
                : {};

            var verb = destructActive ? 'Disable' : 'Enable';

            return (
                <a className='item' style={itemStyle} onClick={this.handleDestructClick}>
                    <i className='bomb icon'></i>
                    {verb} Self Destruct{' '}
                    {destructActive ? (
                        <span>
                            <p
                                style={{
                                    margin: 0,
                                }}
                            >
                                SELF DESTRUCT ACTIVE
                            </p>
                            <p
                                style={{
                                    textAlign: 'right !important',
                                }}
                            >
                                {formattedDestructMs}
                            </p>
                        </span>
                    ) : (
                        ''
                    )}
                </a>
            );
        }
    }
);

class LeftSidebar extends React.Component {
    componentDidMount() {
        $('#left-sidebar').sidebar({
            context: $('#sidebarContainer'),
            duration: 300,
            transition: 'overlay',
            onHidden: () => {
                MenuStore.hideLeftSidebar();
            },
        });
    }

    componentDidUpdate() {
        $('#left-sidebar').sidebar(MenuStore.leftSidebarShown ? 'show' : 'hide');
    }

    render() {
        const shown = MenuStore.leftSidebarShown;
        return (
            <div className='ui left vertical inverted sidebar menu' id='left-sidebar'>
                <div className='ui horizontal inverted divider'>Actions</div>

                <a
                    className='item'
                    onClick={function() {
                        MenuStore.hideLeftSidebar();
                        WindowsStore.add('invite');
                    }}
                >
                    <i className='add user icon'></i>
                    Invite a Friend
                </a>
                <a
                    className='item'
                    onClick={function() {
                        MenuStore.hideLeftSidebar();
                        YAHOO.lacuna.MapPlanet.Refresh();
                    }}
                >
                    <i className='refresh icon'></i>
                    Refresh
                </a>

                <div className='ui horizontal inverted divider'>Links</div>

                <a
                    className='item'
                    target='_blank'
                    href='/starmap/'
                    onClick={() => MenuStore.hideLeftSidebar()}
                >
                    <i className='map icon'></i>
                    Alliance Map
                </a>
                <a
                    className='item'
                    target='_blank'
                    href='/changes.txt'
                    onClick={() => MenuStore.hideLeftSidebar()}
                >
                    <i className='code icon'></i>
                    Changes Log
                </a>
                <a
                    className='item'
                    target='_blank'
                    href='http://community.lacunaexpanse.com/forums'
                    onClick={() => MenuStore.hideLeftSidebar()}
                >
                    <i className='comments layout icon'></i>
                    Forums
                </a>
                <a
                    className='item'
                    target='_blank'
                    href='http://www.lacunaexpanse.com/help/'
                    onClick={() => MenuStore.hideLeftSidebar()}
                >
                    <i className='student icon'></i>
                    Help
                </a>
                <a
                    className='item'
                    target='_blank'
                    href='http://www.lacunaexpanse.com/terms/'
                    onClick={() => MenuStore.hideLeftSidebar()}
                >
                    <i className='info circle icon'></i>
                    Terms of Service
                </a>
                <a
                    className='item'
                    target='_blank'
                    href='http://lacunaexpanse.com/tutorial/'
                    onClick={() => MenuStore.hideLeftSidebar()}
                >
                    <i className='marker icon'></i>
                    Tutorial
                </a>
                <a
                    className='item'
                    target='_blank'
                    href='http://community.lacunaexpanse.com/wiki'
                    onClick={() => MenuStore.hideLeftSidebar()}
                >
                    <i className='share alternate icon'></i>
                    Wiki
                </a>

                <div className='ui horizontal inverted divider'>Windows</div>

                <a
                    className='item'
                    onClick={() => {
                        MenuStore.hideLeftSidebar();
                        WindowsStore.add('about');
                    }}
                >
                    <i className='rocket icon'></i>
                    About
                </a>

                <a
                    className='item'
                    onClick={() => {
                        MenuStore.hideLeftSidebar();
                        WindowsStore.add('options');
                    }}
                >
                    <i className='options icon'></i>
                    Options
                </a>
                <a
                    className='item'
                    onClick={function() {
                        MenuStore.hideLeftSidebar();
                        WindowsStore.add('serverClock');
                    }}
                >
                    <i className='wait icon'></i>
                    Server Clock
                </a>

                <div className='ui horizontal inverted divider'>Self Destruct</div>

                <SelfDestruct />
            </div>
        );
    }
}

module.exports = observer(LeftSidebar);
