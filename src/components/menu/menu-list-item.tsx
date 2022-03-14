import { Plate } from '../../api/interfaces/plate';

const MenuListItem = ({ plate, addPlateToOrder }: { plate: Plate, addPlateToOrder: () => void }) => {
  return (
    <div>
      <span>
        {plate.name}, {plate.type}
      </span>
      <span className={'action'}>
        <button onClick={addPlateToOrder}>add to order</button>
      </span>
    </div>
  )
}

export default MenuListItem;
