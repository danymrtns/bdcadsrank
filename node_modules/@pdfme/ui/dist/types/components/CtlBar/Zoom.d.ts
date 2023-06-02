declare type Props = {
    zoomLevel: number;
    setZoomLevel: (zoom: number) => void;
};
declare const Pager: ({ zoomLevel, setZoomLevel }: Props) => JSX.Element;
export default Pager;
