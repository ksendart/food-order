import { Plate } from '../../api/interfaces/plate';
import { SideDish } from '../../api/interfaces/side-dish';
import { Component } from 'react';

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
      <div>
      <span>
        {plate.name}, {plate.type}
      </span>
        {plate.hasSideDish && plate.sideDish &&
          plate.sideDish.map((sideDish: SideDish) => (<span key={sideDish.id}>
          <input type="radio" id={sideDish.id}
                 checked={this.state.sideDish === sideDish}
                 onChange={() => this.setState( { sideDish: sideDish })}
                 name="sideDish" value={sideDish.name}/>
            <label htmlFor={sideDish.id}>{sideDish.name}, {sideDish.type}</label>
        </span>))}
        <span className={'action'}>
        {plate.hasSideDish && <button onClick={() => this.setState({ sideDish: undefined })}>resetSideDish</button>}
        <button onClick={() => addPlateToOrder(this.state.sideDish)}>add to order</button>
      </span>
      </div>
    );
  }
}

export default MenuListItem;
