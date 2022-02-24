import { FoodOrderServiceConsumer } from '../context/food-order.service.context';
import { Component } from 'react';

const withFoodOrderService = () => (Wrapped: Component) => {
  return (props: any) => {
    return (
      <FoodOrderServiceConsumer>
        {
          (foodOrderService) => {
            // @ts-ignore
            return (<Wrapped {...props} foodOrderService={foodOrderService}/>);
          }
        }
      </FoodOrderServiceConsumer>
    );
  }
};

export default withFoodOrderService;
