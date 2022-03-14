import { Component } from 'react';
import { DayMenuList } from './menu';
import { Link } from 'react-router-dom';

export class Home extends Component {
  day = 0;

  render() {
    return (
      <div>
        <h2>Menu</h2>
        <Link to="/order">
          Open Order
        </Link>
        <DayMenuList/>
      </div>
    )
  }
}
