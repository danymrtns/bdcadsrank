import { Size } from '@pdfme/common';
declare type Props = {
    size: Size;
    unitCursor: number;
    unitNum: number;
    setUnitCursor: (page: number) => void;
};
declare const UnitPager: ({ size, unitCursor, unitNum, setUnitCursor }: Props) => JSX.Element;
export default UnitPager;
