import React from 'react';

const {
  Provider: FoodOrderServiceProvider,
  Consumer: FoodOrderServiceConsumer,
} = React.createContext({});

export {
  FoodOrderServiceProvider,
  FoodOrderServiceConsumer,
};
