import { SchemaForUI } from '@pdfme/common';
import { SidebarProps } from '../index';
declare const PositionAndSizeEditor: (props: Pick<SidebarProps, 'pageSize' | 'schemas' | 'changeSchemas' | 'activeElements'> & {
    activeSchema: SchemaForUI;
}) => JSX.Element;
export default PositionAndSizeEditor;
