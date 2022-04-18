'use strict';

import React from 'react';
import classnames from 'classnames';
import { observer } from 'mobx-react';
import _ from 'lodash';

import EmpireService from 'app/js/services/empire';
import EmpireRPCStore from 'app/js/stores/rpc/empire';
import ServerRPCStore from 'app/js/stores/rpc/server';
import MenuStore from 'app/js/stores/menu';
import WindowsStore from 'app/js/stores/windows';
import MailWindowStore from 'app/js/stores/window/mail';
import StatsWindowStore from 'app/js/stores/window/stats';

class TopBar extends React.Component {
    mapButtonTip() {
        if (MenuStore.mapMode === MenuStore.PLANET_MAP_MODE) {
            return 'To Star Map';
        } else {
            return 'To Planet Map';
        }
    }

    render() {
        var barClass = classnames('ui inverted compact small menu', {
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

export default observer(TopBar);
