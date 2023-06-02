import { SchemaForUI } from '@pdfme/common';
import { SidebarProps } from '..';
declare const ExampleInputEditor: (props: Pick<SidebarProps, 'changeSchemas'> & {
    activeSchema: SchemaForUI;
}) => JSX.Element;
export default ExampleInputEditor;
