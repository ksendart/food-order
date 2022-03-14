import { Component } from 'react';
import MenuListItem from './menu-list-item';
import { DayMenu, MenuFilter } from '../../api/interfaces/menu';
import Spinner from '../spinner/spinner';
import ErrorIndicator from '../error/error-indicator';
import { State } from '../../api/interfaces/state';
import {
  addPlateToOrder,
  dayMenuLoaded,
  menuError,
  menuRequested,
  plateTypesLoaded,
  plateTypesRequested
} from '../../actions';
import withFoodOrderService from '../hoc/with-food-order-service';
import { connect } from 'react-redux';
import { compose } from '../../utils';
import { Plate, PlateType } from '../../api/interfaces/plate';

interface DayMenuListContainerProps {
  fetchPlateTypes: () => void;
  fetchDayMenu: (filter: MenuFilter) => void;
  addPlateToOrder: (plate: Plate) => void;
  plateTypes: PlateType[],
  dayMenu: DayMenu;
  loading: boolean;
  error: string;
}

interface DayMenuListProps {
  dayMenu: DayMenu;
  addPlateToOrder: (plate: Plate) => void;
}

class DayMenuList extends Component<DayMenuListProps> {
  render() {
    const { dayMenu, addPlateToOrder } = this.props;
    return (
      <li key={dayMenu.day}>
        <ul>
          {
            dayMenu.plates.map((menuItem) => {
              return (<li key={menuItem.id}><MenuListItem plate={menuItem} addPlateToOrder={() => addPlateToOrder(menuItem)}/></li>)
            })
          }
        </ul>
      </li>
    );
  }
}

class DayMenuListContainer extends Component<DayMenuListContainerProps> {
  componentDidMount() {
    this.props.fetchPlateTypes();
  }

  selectType(type: PlateType) {
    this.props.fetchDayMenu({
      type,
    })
  }

  render() {
    const { dayMenu, loading, error, plateTypes, addPlateToOrder } = this.props;
    if (loading && !plateTypes) {
      return (<Spinner/>);
    }
    if (error) {
      return (<ErrorIndicator/>);
    }

    return (
      <div>
        <ul>
          { plateTypes.map(type => (<li key={type} onClick={() => this.selectType(type)}>{ type }</li>))}
        </ul>
        { !loading ? <DayMenuList dayMenu={dayMenu} addPlateToOrder={addPlateToOrder}/> :  <Spinner/> }
      </div>
    );
    // return ()
  }
}

const mapStateToProps = (state: State) => {
  const { dayMenu, loading, error, plateTypes } = state.user;
  return {
    plateTypes,
    dayMenu,
    loading,
    error,
  };
}
// @ts-ignore
const mapDispatchToProps = (dispatch, ownProps) => {
  const { foodOrderService } = ownProps;
  return {
    addPlateToOrder: (plate: Plate) => {
      dispatch(addPlateToOrder(plate));
    },
    fetchPlateTypes: () => {
      dispatch(plateTypesRequested());
      foodOrderService.getPlateTypes()
        .then((types: PlateType[]) => dispatch(plateTypesLoaded(types)));
    },
    fetchDayMenu: (filter: MenuFilter) => {
      dispatch(menuRequested());
      foodOrderService.getDayMenu(filter)
        .then((data: DayMenu) => dispatch(dayMenuLoaded(data)))
        .catch((err: string) => dispatch(menuError(err)));
    },
  }
}

export default compose(
  withFoodOrderService(),
  connect(mapStateToProps, mapDispatchToProps)
)(DayMenuListContainer);
