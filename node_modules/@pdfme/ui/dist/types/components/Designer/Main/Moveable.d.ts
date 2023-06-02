import React from 'react';
import { OnDrag, OnResize, OnDragEnd, OnDragGroupEnd, OnResizeEnd, OnResizeGroupEnd, OnClick } from 'react-moveable';
declare type Props = {
    target: HTMLElement[];
    bounds: {
        left: number;
        top: number;
        bottom: number;
        right: number;
    };
    horizontalGuidelines: number[];
    verticalGuidelines: number[];
    keepRatio: boolean;
    onDrag: ((e: OnDrag) => void) & (({ target, left, top }: OnDrag) => void);
    onDragEnd: ((e: OnDragEnd) => void) & (({ target }: {
        target: HTMLElement | SVGElement;
    }) => void);
    onDragGroupEnd: ((e: OnDragGroupEnd) => void) & (({ targets }: {
        targets: (HTMLElement | SVGElement)[];
    }) => void);
    onResize: ((e: OnResize) => void) & (({ target, width, height, direction }: OnResize) => void);
    onResizeEnd: ((e: OnResizeEnd) => void) & (({ target }: {
        target: HTMLElement | SVGElement;
    }) => void);
    onResizeGroupEnd: ((e: OnResizeGroupEnd) => void) & (({ targets }: {
        targets: (HTMLElement | SVGElement)[];
    }) => void);
    onClick: (e: OnClick) => void;
};
declare const _default: React.ForwardRefExoticComponent<Props & React.RefAttributes<any>>;
export default _default;
