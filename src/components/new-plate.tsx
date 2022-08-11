import React, { ChangeEvent, Component } from 'react';
import withFoodOrderService from './hoc/with-food-order-service';
import { connect } from 'react-redux';
import compose from '../utils/compose';
import { State } from '../api/interfaces/state';
import { Plate, PlateType } from '../api/interfaces/plate';
import { addPlateToMenu } from '../actions';
import { Link as RouterLink } from 'react-router-dom';
import withAuthentication from './hoc/with-authentication';
import withRouter from './hoc/with-router';
import Button from '@mui/material/Button';
import PlateForm from './form/plate-form';
import { TextField, Link } from '@mui/material';

interface PlateInDayProps {
  addPlateToMenu: (day: number, plate: Partial<Plate>) => void;
  router: { navigate: (path: string) => void };
}

class NewPlate extends Component<PlateInDayProps,({ day: number, newPlate: Partial<Plate>} | null)> {
  state = {
    day: 0,
    newPlate: {
      name: '',
      type: PlateType.salad,
      hasSideDish: false,
      sideDish: [],
    }
  };
  render() {
    const addPlateToMenu = this.props.addPlateToMenu;
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      this.setState({[event.target.name]: event.target.value});
    };
    const onSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      addPlateToMenu(this.state.day, { ...this.state.newPlate });
      this.props.router.navigate('/');
    }
    const addPlateToDay = (plate: Partial<Plate>) => {
      // @ts-ignore
      this.setState(({ newPlate }) => ({ newPlate: plate }));
    };
    return (
      <div>
        <h2>Order</h2>
        <div className='link-list'>
          <Link component={RouterLink} to="/">Back to Home</Link>
        </div>
        <div className='form-container'>
          <TextField
            label="Day"
            name="day"
            inputProps={{ step: 1,
              min: 0,
              max: 6,
              type: 'number' }}
            value={this.state.day}
            onChange={handleInputChange} />
          <PlateForm addPlateToDay={addPlateToDay}/>
          <span className={'action'}>
            <Button variant="contained" onClick={onSubmit}>Add to Menu</Button>
          </span>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: State) => {
  const { order } = state.user;
  return {
    order,
  };
}
// @ts-ignore
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addPlateToMenu: (day: number, plate: Partial<Plate>) => {
      dispatch(addPlateToMenu(day, plate));
    },
  }
}

export default compose(
  withAuthentication(),
  withFoodOrderService(),
  withRouter(),
  connect(mapStateToProps, mapDispatchToProps)
)(NewPlate);
