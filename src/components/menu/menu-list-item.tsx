import { Plate } from '../../api/interfaces/plate';

const MenuListItem = ({ plate }: { plate: Plate }) => {
  return (
    <div>
      <span>
        {plate.name}, {plate.type}
      </span>
    </div>
  )
}

export default MenuListItem;
