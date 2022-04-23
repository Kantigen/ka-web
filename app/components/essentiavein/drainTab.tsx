import React from 'react';
import _ from 'lodash';

type Props = {
    building: any;
};

class DrainTab extends React.Component<Props> {
    dropdown = React.createRef<HTMLSelectElement>();

    componentDidMount() {
        $(this.refs.dropdown).dropdown();
    }

    handleDrain = () => {
        let times = parseInt($(this.refs.dropdown).dropdown('get value'), 10) / 30;
        let id = this.props.building.id;

        EssentiaVeinRPCActions.requestEssentiaVeinRPCDrain({
            id: id,
            times: times,
        });
    };

    render() {
        return (
            <div>
                Drain{' '}
                <div className='ui inline dropdown' ref='dropdown'>
                    <div className='text'>30 days</div>
                    <i className='dropdown icon'></i>
                    <div className='menu'>
                        {_.times(this.props.building.drain_capable, function (num) {
                            // Num starts on 0.
                            num += 1;

                            let days = num * 30;
                            let str = days + ' days';

                            return (
                                <div className='item' data-text={str} key={days}>
                                    {days}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className='ui green button' onClick={this.handleDrain}>
                    Drain
                </div>
            </div>
        );
    }
}

export default DrainTab;
