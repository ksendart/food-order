import { Component } from 'react';
import withFoodOrderService from './hoc/with-food-order-service';
import { connect } from 'react-redux';
import compose from '../utils/compose';
import { State } from '../api/interfaces/state';
import { Order } from '../api/interfaces/order';
import { OrderPlate } from '../api/interfaces/plate';
import { ordersLoaded, ordersRequested } from '../actions';
import { Link } from 'react-router-dom';
import Spinner from './spinner/spinner';
import withAuthentication from './hoc/with-authentication';

interface OrdersContainerProps {
  orders: Order[];
  loading: boolean;
  fetchAllOrders: () => void;
}
interface OrdersProps {
  orders: Order[];
}

class OrderList extends Component<OrdersProps> {
  render() {
    const userOrders = this.props.orders;
    return (
      <div>
        <h2>Order</h2>
        <Link to="/">Back to Home</Link>
        <ul>
          { userOrders.map(userOrder => (
            <li key={userOrder.user}> {userOrder.user}
              <ul>{ userOrder.plates.map((plate: OrderPlate) => (
                <li key={plate.id}>
                  <span>{plate.plate.name}</span>
                  <span>{plate.count}</span>
                  <span className={'action'}>
                  </span>
                </li>))}
              </ul>
            </li>))}
        </ul>
      </div>
    )
  }
}

class OrdersContainer extends Component<OrdersContainerProps> {
  componentDidMount() {
    this.props.fetchAllOrders();
  }

  render() {
    const { orders, loading } = this.props;
    if (loading) {
      return (<Spinner/>);
    }
    return (<OrderList orders={orders}/>)
  }
}

const mapStateToProps = (state: State) => {
  const { orders, loading } = state.admin;
  return {
    orders,
    loading,
  };
}
// @ts-ignore
const mapDispatchToProps = (dispatch, ownProps) => {
  const { foodOrderService } = ownProps;
  return {
    fetchAllOrders: () => {
      dispatch(ordersRequested());
      foodOrderService.fetchAllOrders()
        .then((data: Order[]) => dispatch(ordersLoaded(data)));
    },
  }
}

export default compose(
  withAuthentication(),
  withFoodOrderService(),
  connect(mapStateToProps, mapDispatchToProps)
)(OrdersContainer);
