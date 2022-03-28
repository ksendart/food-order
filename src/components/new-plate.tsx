import { ChangeEvent, Component, FormEvent } from 'react';
import withFoodOrderService from './hoc/with-food-order-service';
import { connect } from 'react-redux';
import compose from '../utils/compose';
import { State } from '../api/interfaces/state';
import { Plate, PlateType } from '../api/interfaces/plate';
import { addPlateToMenu } from '../actions';
import { Link } from 'react-router-dom';
import withAuthentication from './hoc/with-authentication';
import { SideDish, SideDishType } from '../api/interfaces/side-dish';
import withRouter from './hoc/with-router';

interface SideDishProps {
  addSideDish: (sideDish: Partial<SideDish>) => void;
}

class NewSideDish extends Component<SideDishProps, Partial<SideDish>> {
  dishId = 1;
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
      this.props.addSideDish({ ...this.state, id: '' + this.dishId++ });
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
            <input type="submit" value="Add to Plate"/>
          </span>
      </form>
    );
  }
}

interface PlateProps {
  addPlateToMenu: (day: number, plate: Partial<Plate>) => void;
  router: { navigate: (path: string) => void };
}

class NewPlate extends Component<PlateProps,(Partial<Plate> | null)> {
  plateId = 1;
  state = {
    name: '',
    type: PlateType.salad,
    hasSideDish: false,
    sideDish: [],
  };
  render() {
    const addPlateToMenu = this.props.addPlateToMenu;
    const addSideDish = (newSideDish: Partial<SideDish>) => {
      // @ts-ignore
      this.setState(({ sideDish }) => ({ sideDish: [...sideDish, newSideDish] }));
    };
    const removeSideDish = (removedSideDish: SideDish) => {
      // @ts-ignore
      this.setState(({ sideDish }) => {
        const index = sideDish.findIndex((_: SideDish) => removedSideDish.name === _.name && removedSideDish.type === _.type);
        return {
          sideDish: [...sideDish.slice(0, index), ...sideDish.slice(index + 1)],
        }
      });
    };
    const handleInputChange = (event: ChangeEvent<(HTMLInputElement | HTMLSelectElement)>) => {
      if (event.target.type === 'checkbox') {
        // @ts-ignore
        this.setState({ [event.target.name] : event.target.checked });
      } else {
        this.setState({[event.target.name]: event.target.value});
      }
    };
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      addPlateToMenu(0, { ...this.state, id: '' + this.plateId++ });
      this.props.router.navigate('/');
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
          { this.state.hasSideDish && this.state.sideDish.length &&
            (
              this.state.sideDish.map((sideDish: SideDish) => (
                <span key={sideDish.id}>
                  <span>{sideDish.name}, {sideDish.type}</span>
                  <span><button onClick={() => removeSideDish(sideDish)}>remove</button></span>
                </span>))
            )
          }
          <br />
          <span className={'action'}>
            <input type="submit" value="Add to Menu"/>
          </span>
        </form>
        { this.state.hasSideDish && <NewSideDish addSideDish={addSideDish}/> }
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
