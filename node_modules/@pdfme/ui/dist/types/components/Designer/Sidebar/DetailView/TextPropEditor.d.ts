import { SchemaForUI } from '@pdfme/common';
import { SidebarProps } from '..';
declare const TextPropEditor: (props: Pick<SidebarProps, 'changeSchemas'> & {
    activeSchema: SchemaForUI;
}) => JSX.Element;
export default TextPropEditor;
