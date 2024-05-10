"use client"
import * as C from '@/ComponentsStyles.styles';
import { Button } from '@/components/Button';
import { InfoItem } from '@/components/InfoItem';

const Page = () => {
    const resetAndCreateGrid = () => {

    }
  return (
    <C.Container>
        <C.Info>
            <C.LogoLink href="">
                <img src="/assets/devmemory_logo.png" alt="Logo" width="200" />
            </C.LogoLink>

            <C.InfoArea>
                <InfoItem label="Tempo" value="00:00" />
                <InfoItem label="Movimentos" value="0" />
            </C.InfoArea>

            <Button label="Reiniciar" icon="/assets/svgs/restart.svg" onClick={resetAndCreateGrid} />
        </C.Info>
        <C.GridArea>
            ...
        </C.GridArea>
    </C.Container>
  );
}

export default Page;