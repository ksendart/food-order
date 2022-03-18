import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home';
import UserOrder from './components/user-order';
import Login from './components/login';
import Logout from './components/logout';
import Orders from './components/orders';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/"  element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/order"  element={<UserOrder/>}/>
        <Route path="/orders"  element={<Orders/>}/>
      </Routes>
    </div>
  );
}

export default App;
