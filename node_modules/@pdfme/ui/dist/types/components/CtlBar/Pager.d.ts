declare type Props = {
    pageCursor: number;
    pageNum: number;
    setPageCursor: (page: number) => void;
};
declare const Pager: ({ pageCursor, pageNum, setPageCursor }: Props) => JSX.Element;
export default Pager;
