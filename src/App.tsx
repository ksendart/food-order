import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from './components/home';
import UserOrder from './components/user-order';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/"  element={<Home/>}/>
        <Route path="/order"  element={<UserOrder/>}/>
      </Routes>
    </div>
  );
}

export default App;
