import React from 'react';
import server from 'app/server';
import {
  BuildingWindowOptions,
  BuildingsViewResponse,
  Building,
  BuildingComponentProps,
} from 'app/interfaces';

type Props = {
  options: BuildingWindowOptions;
};

type State<Type> = {
  building: Type;
};

function withBuildingData<Type extends Building>(WrappedComponent: React.ComponentType<BuildingComponentProps<Type>>) {
  return class extends React.Component<Props, State<Type>> {
    constructor(props: any) {
      super(props);
      this.state = {
        building: {
          id: 0,
          name: '',
          image: '',
          level: 0,
          x: 0,
          y: 0,
          food_hour: 0,
          food_capacity: 0,
          energy_hour: 0,
          energy_capacity: 0,
          ore_hour: 0,
          ore_capacity: 0,
          water_hour: 0,
          water_capacity: 0,
          waste_hour: 0,
          waste_capacity: 0,
          happiness_hour: 0,
          efficiency: 0,
          url: '',

          repair_costs: {
            food: 0,
            water: 0,
            energy: 0,
            ore: 0,
          },

          downgrade: {
            can: 1,
            reason: [],
            image: '',
          },

          upgrade: {
            can: 1,
            reason: [],

            cost: {
              food: 0,
              water: 0,
              energy: 0,
              waste: 0,
              ore: 0,
              time: 0,
              halls: 0,
            },
            production: {
              food_hour: 0,
              food_capacity: 0,
              energy_hour: 0,
              energy_capacity: 0,
              ore_hour: 0,
              ore_capacity: 0,
              water_hour: 0,
              water_capacity: 0,
              waste_hour: 0,
              waste_capacity: 0,
              happiness_hour: 0,
            },
            image: '',
          },
        },
      };
    }

    getBuildingData() {
      server.call({
        module: this.props.options.url.replace(/^\//, ''),
        method: 'view',
        params: [this.props.options.id],
        addSession: true,
        success: (result: BuildingsViewResponse) => {
          this.setState({ building: result.building });
        },
      });
    }

    componentDidMount() {
      this.getBuildingData();
    }

    componentDidUpdate(prevProps: Props) {
      if (
        prevProps.options.url != this.props.options.url ||
        prevProps.options.id != this.props.options.id
      ) {
        this.getBuildingData();
      }
    }

    render() {
      return <WrappedComponent building={this.state.building} {...this.props} />;
    }
  };
}

export default withBuildingData;
