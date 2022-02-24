import { Component } from 'react';
import { DayMenu } from '../../api/interfaces/menu';
import { MenuListItem } from './menu-list-item';

export interface MenuListProps {
  dayMenu: DayMenu;
}

export class MenuList extends Component<MenuListProps> {
  render() {
    const { dayMenu } = this.props;
    return (
      <ul>
        {
          dayMenu.plates.map((menuItem) => {
            return (<li key={menuItem.id}><MenuListItem/></li>)
          })
        }
      </ul>
    )
  }
}
