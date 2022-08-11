import React, { Component } from 'react';
import withFoodOrderService from './hoc/with-food-order-service';
import { connect } from 'react-redux';
import compose from '../utils/compose';
import { State } from '../api/interfaces/state';
import { Order } from '../api/interfaces/order';
import { OrderPlate, Plate } from '../api/interfaces/plate';
import { removePlateFromOrder } from '../actions';
import { Link as RouterLink } from 'react-router-dom';
import withAuthentication from './hoc/with-authentication';
import { SideDish } from '../api/interfaces/side-dish';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

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
        <Link component={RouterLink} to="/">Back to Home</Link>
        <ul>
          { userOrder.plates.map((plate: OrderPlate, index: number) => (
            <li key={'' + index + plate.id}>
              <span>{plate.plate.name}</span>
              {
                plate.plate.hasSideDish && plate.plate.sideDish &&
                plate.plate.sideDish.map((sideDish: SideDish) => (<span key={sideDish.id}>
                  <span>{sideDish.name}, {sideDish.type}</span>
                </span>))
              }
              <span>{plate.count}</span>
              <span className={'action'}>
                <Button variant="contained" onClick={() => removePlateFromOrder(plate.plate)}>remove from order</Button>
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
  withAuthentication(),
  withFoodOrderService(),
  connect(mapStateToProps, mapDispatchToProps)
)(UserOrder);
