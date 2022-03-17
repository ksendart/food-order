import { Component } from 'react';
import withFoodOrderService from './hoc/with-food-order-service';
import { connect } from 'react-redux';
import compose from '../utils/compose';
import { State } from '../api/interfaces/state';
import { Order } from '../api/interfaces/order';
import { OrderPlate, Plate } from '../api/interfaces/plate';
import { removePlateFromOrder } from '../actions';
import { Link } from 'react-router-dom';

interface OrderProps {
  order: Order,
  removePlateFromOrder: (plate: Plate) => void
}

class UserOrder extends Component<OrderProps> {
  render() {
    const userOrder = this.props.order;
    const removePlateFromOrder = this.props.removePlateFromOrder;
    return (
      <div>
        <h2>Order</h2>
        <Link to="/">Back to Home</Link>
        <ul>
          { userOrder.plates.map((plate: OrderPlate) => (
            <li key={plate.id}>
              <span>{plate.plate.name}</span>
              <span>{plate.count}</span>
              <span className={'action'}>
                <button onClick={() => removePlateFromOrder(plate.plate)}>remove from order</button>
              </span>
            </li>))}
        </ul>
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
  withFoodOrderService(),
  connect(mapStateToProps, mapDispatchToProps)
)(UserOrder);
