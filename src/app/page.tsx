"use client"
import * as C from '@/ComponentsStyles.styles';
import { useEffect, useState } from 'react';
import { Button } from '@/components/Button';
import { InfoItem } from '@/components/InfoItem';
import { items } from "@/data/items";
import { GridItemType } from '@/types/GridItemType';
import { GridItem } from '@/components/GridItem';
import { formatTimeElapsed } from '@/helpers/formartTimeElapsed';

const Page = () => {
    const [ playing, setPlaying ] = useState(false);
    const [ timeElapsed, setTimeElapsed ] = useState(0);
    const [ moveCount, setMoveCount ] = useState(0);
    const [ shownCount, setShownCount ] = useState(0);
    const [ gridItems, setGridItems ] = useState<GridItemType[]>([])

    useEffect(() => resetAndCreateGrid(), []);

    useEffect(() => {
        const timer = setInterval(() => {
            if(playing) setTimeElapsed(timeElapsed + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [ playing, timeElapsed ]);

    //verifica se são iguais
    useEffect(() => {
        if(shownCount === 2) {
            let opened = gridItems.filter(item => item.shown === true);
            if(opened.length === 2) {
                //primeira verificação (quando são iguais)
                if(opened[0].item === opened[1].item) {
                    let tempGrid = [...gridItems];
                    for(let i in tempGrid) {
                        if(tempGrid[i].shown) {
                            tempGrid[i].permanentShown = true;
                            tempGrid[i].shown = false;
                        }
                    }
                    setGridItems(tempGrid);
                    setShownCount(0);
                } else {
                    //segunda verificação (quando NAO são iguais)
                    setTimeout(() => {
                        let tempGrid = [...gridItems];
                        for(let i in tempGrid) {
                        tempGrid[i].shown = false;
                        }
                        setGridItems(tempGrid);
                        setShownCount(0);
                    }, 1000);
                }
                setMoveCount(moveCount => moveCount + 1);
            }
        }
    }, [ shownCount, gridItems ]);

    useEffect(() => {
        if(moveCount > 0 && gridItems.every(item => item.permanentShown === true)) {
            setPlaying(false);
        }
    }, [ moveCount, gridItems])

    const handleItemClick = (index: number) => {
        if(playing && index !== null && shownCount < 2) {
            let tempGrid = [...gridItems];
            if(tempGrid[index].permanentShown === false && tempGrid[index].shown === false) {
                tempGrid[index].shown = true;
                setShownCount(shownCount + 1);
            }

            setGridItems(tempGrid);
        }
    }

    const resetAndCreateGrid = () => {
        setTimeElapsed(0);
        setMoveCount(0);
        setShownCount(0);
        
        let tempGrid: GridItemType[] = [];
        for(let i = 0; i < (items.length * 2); i++) {
            tempGrid.push({
                item: null,
                shown: false,
                permanentShown: false
            });
        }

        for(let w = 0; w < 2; w++) {
            for(let i = 0; i < items.length; i++){
                let pos = -1;
                while(pos < 0 || tempGrid[pos].item !== null) {
                    pos = Math.floor(Math.random() * (items.length * 2));
                }
                tempGrid[pos].item = i;
            }
        }
        setGridItems(tempGrid);
        setPlaying(true);
    }
  return (
    <C.Container>
        <C.Info>
            <C.LogoLink href="">
                <img src="/assets/devmemory_logo.png" alt="Logo" width="200" />
            </C.LogoLink>

            <C.InfoArea>
                <InfoItem label="Tempo" value={formatTimeElapsed(timeElapsed)} />
                <InfoItem label="Movimentos" value={moveCount.toString()} />
            </C.InfoArea>

            <Button label="Reiniciar" icon="/assets/svgs/restart.svg" onClick={resetAndCreateGrid} />
        </C.Info>
        <C.GridArea>
            <C.Grid>
                {gridItems.map((item, index) => (
                    <GridItem  
                        key={index}
                        item={item}
                        onClick={() => handleItemClick(index)}
                    />
                ))}
            </C.Grid>
        </C.GridArea>
    </C.Container>
  );
}

export default Page;