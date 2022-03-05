import { Component } from 'react';
import { DayMenu } from '../../api/interfaces/menu';
import Spinner from '../spinner/spinner';
import ErrorIndicator from '../error/error-indicator';
import { State } from '../../api/interfaces/state';
import { menuError, menuLoaded, menuRequested } from '../../actions';
import withFoodOrderService from '../hoc/with-food-order-service';
import { connect } from 'react-redux';
import { compose } from '../../utils';
import { Plate, PlateType } from '../../api/interfaces/plate';

interface MenuListProps {
  daysMenu: DayMenu[];
}
interface MenuListContainerProps {
  fetchWholeMenu: () => void;
  daysMenu: DayMenu[];
  loading: boolean;
  error: string;
}

class MenuList extends Component<MenuListProps> {
  render() {
    const { daysMenu } = this.props;
    const printDayMenu = (dayMenu: DayMenu) => {
      const plateTypesMap = Object.keys(PlateType)
        .reduce<{ key:string, plates: Plate[] }[]>(
          (res, key: string) => (
            [
              ...res,
              { key, plates: dayMenu.plates.filter(plate => plate.type === key) },
            ]),
          []);
      return plateTypesMap.map(plateTypeMap => (
          <li key={plateTypeMap.key}> {plateTypeMap.key} <ul>
            {plateTypeMap.plates.map(plate => <li key={plate.id}>{plate.name}</li> )}
          </ul></li>
        )
      )
    }
    return (
        daysMenu.map((dayMenu) => {
            return (
              <ul>
                <li key={dayMenu.day}> {dayMenu.day}
                  <ul>{ printDayMenu(dayMenu) }</ul>
                </li>
              </ul>
            )
          })
    )
  }
}

class MenuListContainer extends Component<MenuListContainerProps> {
  componentDidMount() {
    this.props.fetchWholeMenu();
  }

  render() {
    const { daysMenu, loading, error } = this.props;
    if (loading) {
      return (<Spinner/>);
    }
    if (error) {
      return (<ErrorIndicator/>);
    }
    return (<MenuList daysMenu={daysMenu}/>)
  }
}

const mapStateToProps = (state: State) => {
  const { daysMenu, loading, error } = state.admin;
  return {
    daysMenu,
    loading,
    error,
  };
}
// @ts-ignore
const mapDispatchToProps = (dispatch, ownProps) => {
  const { foodOrderService } = ownProps;
  return {
    fetchWholeMenu: () => {
      dispatch(menuRequested());
      foodOrderService.getMenu()
        .then((data: DayMenu[]) => dispatch(menuLoaded(data)))
        .catch((err: string) => dispatch(menuError(err)));
    },
  }
}

export default compose(
  withFoodOrderService(),
  connect(mapStateToProps, mapDispatchToProps)
)(MenuListContainer);

