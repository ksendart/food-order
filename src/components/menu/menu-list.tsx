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
import { SideDish } from '../../api/interfaces/side-dish';

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
    const printPlate = (plate: Plate, day: number) => {
      return <li key={'day' + day + plate.id}>
        <span>{plate.name}</span>
        {
          plate.hasSideDish && plate.sideDish &&
          plate.sideDish.map((sideDish: SideDish) => (
            <span key={sideDish.id}>
              <span>{sideDish.name}, {sideDish.type}</span>
            </span>))
        }
      </li>
    }
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
          <li key={'type' + dayMenu.day + plateTypeMap.key}> {plateTypeMap.key} <ul>
            {plateTypeMap.plates
              .map(plate => printPlate(plate, dayMenu.day))}
          </ul></li>
        )
      )
    }
    return (
        daysMenu.map((dayMenu) => {
            return (
              <ul key={'wholeDay' + dayMenu.day}>
                <li key={'day' + dayMenu.day}> {dayMenu.day}
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
    // remove condition if API is ready
    if (!this.props.daysMenu || !this.props.daysMenu.length) {
      this.props.fetchWholeMenu();
    }
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

