'use strict';

var React = require('react');
var classNames = require('classnames');
var { observer } = require('mobx-react');
var _ = require('lodash');

var EmpireService = require('js/services/empire');
var EmpireRPCStore = require('js/stores/rpc/empire');
var ServerRPCStore = require('js/stores/rpc/server');
var MenuStore = require('js/stores/menu');
var WindowsStore = require('js/stores/windows');
var MailWindowStore = require('js/stores/window/mail');
var StatsWindowStore = require('js/stores/window/stats');

class TopBar extends React.Component {
    mapButtonTip() {
        if (MenuStore.mapMode === MenuStore.PLANET_MAP_MODE) {
            return 'To Star Map';
        } else {
            return 'To Planet Map';
        }
    }

    render() {
        var barClass = classNames('ui inverted compact small menu', {
            red: EmpireRPCStore.self_destruct_active,
            blue: !EmpireRPCStore.self_destruct_active,
        });

        return (
            <div
                className='ui centered grid'
                style={{
                    zIndex: 2000,
                    position: 'relative',
                    top: 15,
                }}
            >
                <div className='center aligned column'>
                    <div className={barClass} ref='bar'>
                        <a
                            className='item'
                            data-tip={this.mapButtonTip()}
                            onClick={() => MenuStore.toggleMapMode()}
                        >
                            <i className='map big icon'></i>
                        </a>

                        <a className='item' data-tip='Mail' onClick={() => MailWindowStore.show()}>
                            <i className='mail big icon'></i>
                            {EmpireRPCStore.has_new_messages > 0 ? (
                                <div className='ui yellow label'>
                                    {EmpireRPCStore.has_new_messages}
                                </div>
                            ) : (
                                ''
                            )}
                        </a>

                        <a
                            className='item'
                            data-tip='Essentia'
                            onClick={() => {
                                WindowsStore.add('essentia');
                            }}
                        >
                            <i className='money big icon'></i>
                            <div className='ui teal label'>{EmpireRPCStore.essentia}</div>
                        </a>

                        <a
                            className='item'
                            data-tip='Universe Rankings'
                            onClick={() => StatsWindowStore.show()}
                        >
                            <i className='find big icon'></i>
                        </a>

                        {ServerRPCStore.promotions.length > 0 ? (
                            <a
                                className='item'
                                data-tip={
                                    ServerRPCStore.promotions.length > 1
                                        ? 'Active Promotions'
                                        : 'Active Promotion'
                                }
                                onClick={function() {
                                    WindowsStore.add('promotions');
                                }}
                            >
                                <i className='announcement big icon'></i>
                                <div className='ui orange floated right circular label'>Event!</div>
                            </a>
                        ) : (
                            ''
                        )}

                        <a
                            className='item'
                            data-tip='Sign Out'
                            onClick={() => EmpireService.logout()}
                        >
                            <i className='power big icon'></i>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = observer(TopBar);
