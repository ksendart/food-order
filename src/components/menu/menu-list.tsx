import { Component } from 'react';
import { DayMenu } from '../../api/interfaces/menu';
import MenuListItem from './menu-list-item';
import Spinner from '../spinner/spinner';
import ErrorIndicator from '../error/error-indicator';
import { State } from '../../api/interfaces/state';
import { menuError, menuLoaded, menuRequested } from '../../actions';
import withFoodOrderService from '../hoc/with-food-order-service';
import { connect } from 'react-redux';
import { compose } from '../../utils';

interface DayMenuListProps {
  dayMenu: DayMenu;
}
interface MenuListProps {
  daysMenu: DayMenu[];
}
interface MenuListContainerProps {
  fetchBooks: () => void;
  daysMenu: DayMenu[];
  loading: boolean;
  error: string;
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

class MenuList extends Component<MenuListProps> {
  render() {
    const { daysMenu } = this.props;
    return (
      <ul>
        {
          daysMenu.map((dayMenu) => {
            return (<DayMenuList dayMenu={dayMenu}/>)
          })
        }
      </ul>
    )
  }
}

class MenuListContainer extends Component<MenuListContainerProps> {
  componentDidMount() {
    this.props.fetchBooks();
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
  const { menu } = state;
  return {
    daysMenu: menu.daysMenu,
    loading: menu.loading,
    error: menu.error,
  };
}
// @ts-ignore
const mapDispatchToProps = (dispatch, ownProps) => {
  const { foodOrderService } = ownProps;
  return {
    fetchBooks: () => {
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

