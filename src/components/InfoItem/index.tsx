import * as C from '@/components/InfoItem/styles';

type Props = {
    label: string;
    value: string;
}
export const InfoItem = ({ label, value }: Props) => {
  return (
    <div>
        <C.Container>
            <C.Label>{label}</C.Label>
            <C.Value>{value}</C.Value>
        </C.Container>
    </div>
  );
}