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
import { SideDish } from '../../api/interfaces/side-dish';
import { Box, Tab, Tabs, TableContainer, Table, TableBody, TableRow } from '@mui/material';
import Paper from '@mui/material/Paper';

interface DayMenuListContainerProps {
  fetchPlateTypes: () => void;
  fetchDayMenu: (filter: MenuFilter) => void;
  addPlateToOrder: (plate: Plate) => void;
  selectedTabIndex: number,
  plateTypes: PlateType[],
  dayMenu: DayMenu;
  loading: boolean;
  error: string;
}

interface DayMenuListProps {
  dayMenu: DayMenu;
  addPlateToOrder: (plate: Plate, sideDish?: SideDish) => void;
}

class DayMenuList extends Component<DayMenuListProps> {
  render() {
    const { dayMenu, addPlateToOrder } = this.props;
    return (
      <TableContainer component={Paper}>
      <Table>
        <TableBody>
        {
          dayMenu.plates.map((menuItem) => {
            return (
              <TableRow key={menuItem.id}>
                <MenuListItem plate={menuItem}
                              addPlateToOrder={(sideDish) => addPlateToOrder(menuItem, sideDish)}/>
              </TableRow>)
          })
        }
        </TableBody>
      </Table>
      </TableContainer>
    );
  }
}

class DayMenuListContainer extends Component<DayMenuListContainerProps> {
  state = {
    selectedTabIndex: 0,
  };
  componentDidMount() {
    this.props.fetchPlateTypes();
    this.props.fetchDayMenu({
      type: PlateType.salad,
    });
  }

  selectType(type: PlateType) {
    const typeIndex = Object.keys(PlateType).indexOf(type);
    this.setState({ selectedTabIndex: typeIndex });
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
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={this.state.selectedTabIndex} aria-label="basic tabs example">
            { plateTypes.map(type => (<Tab key={type} label={type} onClick={() => this.selectType(type)}/>))}
          </Tabs>
        </Box>
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
    addPlateToOrder: (plate: Plate, sideDish?: SideDish) => {
      dispatch(addPlateToOrder(plate, sideDish));
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
