import { Plate } from '../../api/interfaces/plate';
import { SideDish } from '../../api/interfaces/side-dish';
import { Component } from 'react';
import Button from '@mui/material/Button';
import { TableCell, List, ListItem } from '@mui/material';

interface MenuListItemProps {
  plate: Plate;
  addPlateToOrder: (sideDish?: SideDish) => void;
}

class MenuListItem extends Component<MenuListItemProps, { sideDish: SideDish | undefined }> {
  state = {
    sideDish: undefined,
  };

  render() {
    const { plate, addPlateToOrder } = this.props;
    return (
      <>
        <TableCell>{plate.name}</TableCell>
        <TableCell>{plate.type}</TableCell>
        <TableCell>
          <List>
            {plate.hasSideDish && plate.sideDish &&
              plate.sideDish.map((sideDish: SideDish) => (<ListItem key={sideDish.id}>
              <input type="radio" id={sideDish.id}
                     checked={this.state.sideDish === sideDish}
                     onChange={() => this.setState( { sideDish: sideDish })}
                     name="sideDish" value={sideDish.name}/>
                <label htmlFor={sideDish.id}>{sideDish.name}, {sideDish.type}</label>
            </ListItem>))}
          </List>
          <span className={'action'}>
            {plate.hasSideDish && <Button variant="contained" onClick={() => this.setState({ sideDish: undefined })}>resetSideDish</Button>}
          </span>
        </TableCell>
        <TableCell>
          <Button variant="contained" onClick={() => addPlateToOrder(this.state.sideDish)}>add to order</Button>
        </TableCell>
      </>
    );
  }
}

export default MenuListItem;
