import { Component } from 'react';
import MenuListItem from './menu-list-item';
import { DayMenu } from '../../api/interfaces/menu';
import Spinner from '../spinner/spinner';
import ErrorIndicator from '../error/error-indicator';
import { State } from '../../api/interfaces/state';
import { dayMenuLoaded, menuError, menuRequested } from '../../actions';
import withFoodOrderService from '../hoc/with-food-order-service';
import { connect } from 'react-redux';
import { compose } from '../../utils';

interface DayMenuListContainerProps {
  fetchDayMenu: () => void;
  dayMenu: DayMenu;
  loading: boolean;
  error: string;
}

interface DayMenuListProps {
  dayMenu: DayMenu;
}

class DayMenuList extends Component<DayMenuListProps> {
  render() {
    const { dayMenu } = this.props;
    return (
      <li key={dayMenu.day}>
        <ul>
          {
            dayMenu.plates.map((menuItem) => {
              return (<li key={menuItem.id}><MenuListItem plate={menuItem}/></li>)
            })
          }
        </ul>
      </li>
    );
  }
}

class DayMenuListContainer extends Component<DayMenuListContainerProps> {
  componentDidMount() {
    this.props.fetchDayMenu();
  }

  render() {
    const { dayMenu, loading, error } = this.props;
    if (loading) {
      return (<Spinner/>);
    }
    if (error) {
      return (<ErrorIndicator/>);
    }
    return (<DayMenuList dayMenu={dayMenu}/>)
  }
}

const mapStateToProps = (state: State) => {
  const { dayMenu, loading, error } = state.user;
  return {
    dayMenu,
    loading,
    error,
  };
}
// @ts-ignore
const mapDispatchToProps = (dispatch, ownProps) => {
  const { foodOrderService } = ownProps;
  return {
    fetchDayMenu: () => {
      dispatch(menuRequested());
      foodOrderService.getDayMenu(0)
        .then((data: DayMenu) => dispatch(dayMenuLoaded(data)))
        .catch((err: string) => dispatch(menuError(err)));
    },
  }
}

export default compose(
  withFoodOrderService(),
  connect(mapStateToProps, mapDispatchToProps)
)(DayMenuListContainer);
