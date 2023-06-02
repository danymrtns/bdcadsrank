import { SchemaForUI } from '@pdfme/common';
import { SidebarProps } from '../index';
declare const TypeAndKeyEditor: (props: Pick<SidebarProps, 'schemas' | 'changeSchemas'> & {
    activeSchema: SchemaForUI;
}) => JSX.Element;
export default TypeAndKeyEditor;
