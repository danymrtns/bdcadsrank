import { SchemaForUI } from '@pdfme/common';
import { SidebarProps } from '../index';
declare const DetailView: (props: Pick<SidebarProps, 'schemas' | 'pageSize' | 'changeSchemas' | 'activeElements'> & {
    activeSchema: SchemaForUI;
}) => JSX.Element;
export default DetailView;
