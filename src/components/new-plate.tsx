import { ChangeEvent, Component, FormEvent } from 'react';
import withFoodOrderService from './hoc/with-food-order-service';
import { connect } from 'react-redux';
import compose from '../utils/compose';
import { State } from '../api/interfaces/state';
import { Plate, PlateType } from '../api/interfaces/plate';
import { removePlateFromOrder } from '../actions';
import { Link } from 'react-router-dom';
import withAuthentication from './hoc/with-authentication';
import { SideDish, SideDishType } from '../api/interfaces/side-dish';

interface SideDishProps {
  addSideDish: (sideDish: Partial<SideDish>) => void;
}

class NewSideDish extends Component<SideDishProps, Partial<SideDish>> {
  initialState = {
    name: '',
    type: SideDishType.sauce,
  }
  state = {
    name: '',
    type: SideDishType.sauce,
  };

  render() {
    const handleInputChange = (event: ChangeEvent<(HTMLInputElement | HTMLSelectElement)>) => {
      this.setState({ [event.target.name]: event.target.value });
    };
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      this.props.addSideDish(this.state);
      this.setState({ ...this.initialState });
    }
    return (
      <form onSubmit={onSubmit}>
        <label>
          Name
          <input
            name="name"
            type="text"
            value={this.state.name}
            onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Type
          <select name="type" value={this.state.type} onChange={handleInputChange}>
            <option value={SideDishType.sauce}>Sauce</option>
            <option value={SideDishType.garnish}>Garnish</option>
            <option value={SideDishType.topping}>Topping</option>
          </select>
        </label>
        <br />
        <span className={'action'}>
            <input type="submit" value="Add to Menu"/>
          </span>
      </form>
    );
  }
}

interface PlateProps {
  addPlateToMenu: (plate: Partial<Plate>) => void
}

class NewPlate extends Component<PlateProps,(Partial<Plate> | null)> {
  state = {
    name: '',
    type: PlateType.salad,
    hasSideDish: false,
    sideDish: [],
  };
  render() {
    const addPlateToMenu = this.props.addPlateToMenu;
    const addSideDish = (event: any) => {
      // @ts-ignore
      this.setState(({ sideDish }) => ({ sideDish: [...sideDish, event.target.value] }));
    };
    const handleInputChange = (event: ChangeEvent<(HTMLInputElement | HTMLSelectElement)>) => {
      this.setState({ [event.target.name]: event.target.value });
    };
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      addPlateToMenu(this.state);
    }
    return (
      <div>
        <h2>Order</h2>
        <Link to="/">Back to Home</Link>
        <form onSubmit={onSubmit}>
          <label>
            Name
            <input
              name="name"
              type="text"
              value={this.state.name}
              onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Type
            <select name="type" value={this.state.type} onChange={handleInputChange}>
              <option value={PlateType.salad}>Salad</option>
              <option value={PlateType.main}>Main</option>
              <option value={PlateType.desert}>Desert</option>
            </select>
          </label>
          <br />
          <label>
            Has side dish
          <input type="checkbox"
                 checked={this.state.hasSideDish}
                 onChange={handleInputChange}
                 name="hasSideDish"/>
          </label>
          { this.state.hasSideDish && <NewSideDish addSideDish={addSideDish}/> }
          <br />
          <span className={'action'}>
            <input type="submit" value="Add to Menu"/>
          </span>
        </form>
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
    removePlateFromOrder: (plate: Plate) => {
      dispatch(removePlateFromOrder(plate));
    },
  }
}

export default compose(
  withAuthentication(),
  withFoodOrderService(),
  connect(mapStateToProps, mapDispatchToProps)
)(NewPlate);
