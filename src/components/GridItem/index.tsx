import * as C from '@/components/GridItem/styles';
import { items } from '@/data/items';
import { GridItemType } from '@/types/GridItemType';

type Props = {
  item: GridItemType,
  onClick: () => void
}
export const GridItem = ({ item, onClick }: Props) => {
  return (
    <C.Container 
        showBackground={item.permanentShown || item.shown}
        onClick={onClick}
    >   
        {item.permanentShown === false && item.shown === false && 
            <C.Icon src='/assets/svgs/b7.svg' alt="" opacity={.1} />
        }
        {item.permanentShown || item.shown && item.item !== null &&
            <C.Icon src={items[item.item].icon} />
        }
    </C.Container>
  );
}