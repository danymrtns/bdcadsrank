import { Size } from '@pdfme/common';
declare type Props = {
    size: Size;
    pageCursor: number;
    pageNum: number;
    setPageCursor: (page: number) => void;
    zoomLevel: number;
    setZoomLevel: (zoom: number) => void;
};
declare const CtlBar: (props: Props) => JSX.Element;
export default CtlBar;
