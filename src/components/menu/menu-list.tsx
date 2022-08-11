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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ListItemText } from '@mui/material';

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
      return <ListItem key={plate.id}>
        <ListItemText primary={plate.name} secondary={
          plate.hasSideDish && plate.sideDish &&
          plate.sideDish.map((sideDish: SideDish) => (
            <span key={plate.id + sideDish.id}>
              <span>{sideDish.name}, {sideDish.type}</span>
            </span>))
        }></ListItemText>
      </ListItem>
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
      return (<TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {Object.keys(PlateType).map(type => (<TableCell key={'cell'+type}>{ type }</TableCell>))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
        {
          plateTypesMap.map(plateTypeMap => (
              <TableCell key={'type' + dayMenu.day + plateTypeMap.key}><List>
                {plateTypeMap.plates
                  .map(plate => printPlate(plate, dayMenu.day))}
              </List></TableCell>
            )
          )
        }
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>)
    }
    return (
        daysMenu.map((dayMenu) => {
            return (
              <List key={'wholeDay' + dayMenu.day}>
                <ListItem key={'day' + dayMenu.day}>
                  {/*<ListSubheader component="div">*/}
                  {/*  {dayMenu.day}*/}
                  {/*</ListSubheader>*/}
                  <List>{ printDayMenu(dayMenu) }</List>
                </ListItem>
              </List>
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

