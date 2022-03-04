import { Component } from 'react';
import { MenuList } from './menu';

export class Home extends Component {
  render() {
    return (
      <div>
        <h2>Menu</h2>
        <MenuList/>
      </div>
    )
  }
}
