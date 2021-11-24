'use strict';

var PropTypes = require('prop-types');

var React = require('react');
var _ = require('lodash');
const { observer } = require('mobx-react');

var classNames = require('classnames');

var EmpireRPCStore = require('js/stores/rpc/empire');
var MenuStore = require('js/stores/menu');

class PlanetListItem extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        currentBody: PropTypes.number.isRequired,
        zone: PropTypes.string.isRequired,
    };

    getInitialProps = () => {
        return {
            name: '',
            id: 0,
            currentBody: 0,
            zone: '',
        };
    };

    // Returns true if this list item is the the currently selected planet.
    isCurrentWorld = () => {
        return this.props.currentBody === this.props.id;
    };

    handleClick = () => {
        MenuStore.hideRightSidebar();

        if (this.isCurrentWorld()) {
            YAHOO.lacuna.MapPlanet.Refresh();
        } else {
            MenuStore.changePlanet(this.props.id);
        }
    };

    render() {
        var classStr = classNames({
            'ui large teal label': this.isCurrentWorld(),
            item: !this.isCurrentWorld(),
        });

        return (
            <a
                className={classStr}
                onClick={this.handleClick}
                style={{
                    // For some reason this doesn't get set on the items (by Semantic) when it should.
                    cursor: 'pointer',
                }}
            >
                {this.props.name} ({this.props.zone})
            </a>
        );
    }
}

class AccordionItem extends React.Component {
    static propTypes = {
        list: PropTypes.arrayOf(PropTypes.object).isRequired,
        currentBody: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        initiallyOpen: PropTypes.bool.isRequired,
    };

    state = {
        open: this.props.initiallyOpen,
    };

    getInitialProps = () => {
        return {
            list: [],
            currentBody: 0,
            title: '',
            initiallyOpen: false,
        };
    };

    componentDidMount() {
        // RightSidebarActions.rightSidebarCollapse.listen(this.hideList);
        // RightSidebarActions.rightSidebarExpand.listen(this.showList);
    }

    showList = () => {
        this.setState({
            open: true,
        });
    };

    hideList = () => {
        this.setState({
            open: false,
        });
    };

    toggleList = () => {
        this.setState({
            open: !this.state.open,
        });
    };

    render() {
        return (
            <div>
                <div
                    className='ui horizontal inverted divider'
                    title={
                        this.state.open
                            ? 'Click to hide ' + this.props.title.toLowerCase()
                            : 'Click to show ' + this.props.title.toLowerCase()
                    }
                    onClick={this.toggleList}
                    style={{
                        cursor: 'pointer',
                    }}
                >
                    {this.state.open ? (
                        <i className='angle down icon'></i>
                    ) : (
                        <i className='angle right icon'></i>
                    )}{' '}
                    {this.props.title}
                </div>
                <div
                    style={{
                        display: this.state.open ? '' : 'none',
                    }}
                >
                    {_.map(
                        this.props.list,
                        _.bind(function(planet) {
                            return (
                                <PlanetListItem
                                    key={planet.id}
                                    name={planet.name}
                                    id={planet.id}
                                    x={planet.x}
                                    y={planet.y}
                                    zone={planet.zone}
                                    currentBody={this.props.currentBody}
                                />
                            );
                        }, this)
                    )}
                </div>
            </div>
        );
    }
}

class BodiesAccordion extends React.Component {
    static propTypes = {
        bodies: PropTypes.object.isRequired,
        currentBody: PropTypes.number.isRequired,
    };

    render() {
        var items = [
            {
                title: 'My Colonies',
                key: 'colonies',
                initiallyOpen: true,
                isBaby: false,
            },
            {
                title: 'My Stations',
                key: 'mystations',
                initiallyOpen: false,
                isBaby: false,
            },
            {
                title: 'Our Stations',
                key: 'ourstations',
                initiallyOpen: false,
                isBaby: false,
            },
        ];

        // Handle all the babies.
        _.chain(this.props.bodies.babies || {})
            .keys()
            .sortBy()
            .each(function(babyName) {
                items.push({
                    title: babyName + "'s Colonies",
                    key: babyName,
                    initiallyOpen: false,
                    isBaby: true,
                });
            })
            .value();

        return (
            <div>
                {_.map(
                    items,
                    _.bind(function(item) {
                        var list = [];

                        if (item.isBaby) {
                            list = _.values(this.props.bodies.babies[item.key].planets) || [];
                        } else {
                            list = _.values(this.props.bodies[item.key]) || [];
                        }

                        if (list.length > 0) {
                            return (
                                <AccordionItem
                                    title={item.title}
                                    list={list}
                                    initiallyOpen={item.initiallyOpen}
                                    currentBody={this.props.currentBody}
                                    key={item.title}
                                />
                            );
                        }
                    }, this)
                )}
            </div>
        );
    }
}

class RightSidebar extends React.Component {
    componentDidMount() {
        $('#right-sidebar').sidebar({
            context: $('#sidebarContainer'),
            duration: 300,
            transition: 'overlay',
            onHidden: () => {
                MenuStore.hideRightSidebar();
            },
        });
    }

    componentDidUpdate() {
        $('#right-sidebar').sidebar(MenuStore.rightSidebarShown ? 'show' : 'hide');
    }

    homePlanet() {
        MenuStore.hideRightSidebar();
        MenuStore.changePlanet(EmpireRPCStore.home_planet_id);
    }

    expand() {
        // RightSidebarActions.rightSidebarExpand();
    }

    collapse() {
        // RightSidebarActions.rightSidebarCollapse();
    }

    render() {
        const shown = MenuStore.rightSidebarShown;
        return (
            <div className='ui right vertical inverted sidebar menu' id='right-sidebar'>
                <div style={{ paddingTop: 7 }}>
                    <a
                        title='Go to home planet'
                        className='item'
                        onClick={this.homePlanet}
                        style={{
                            display: 'inline',
                        }}
                    >
                        Home
                    </a>

                    <div style={{ float: 'right' }}>
                        <a
                            title='Expand all'
                            className='item'
                            onClick={this.expand}
                            style={{
                                display: 'inline',
                            }}
                        >
                            [+]
                        </a>

                        <a
                            title='Collapse all'
                            className='item'
                            onClick={this.collapse}
                            style={{
                                display: 'inline',
                            }}
                        >
                            [-]
                        </a>
                    </div>
                </div>

                <div
                    style={{
                        overflow: 'auto',
                        overflowX: 'hidden',
                    }}
                >
                    <BodiesAccordion
                        bodies={EmpireRPCStore.bodies}
                        currentBody={MenuStore.planetId}
                    />
                </div>
            </div>
        );
    }
}

module.exports = observer(RightSidebar);
