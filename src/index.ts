import './drag-drop';
import { fromEvent } from "rxjs";
import { drag } from "./drag-drop";

const box = document.querySelector('.draggable') as HTMLDivElement;
const mousedown$ = fromEvent<MouseEvent>(box, 'mousedown');
const mousemove$ = fromEvent<MouseEvent>(document, 'mousemove');
const mouseup$ = fromEvent<MouseEvent>(box, 'mouseup');

drag(mousedown$, mousemove$, mouseup$)
    .subscribe((pos) => {
            box.style.left = `${pos.left}px`;
            box.style.top = `${pos.top}px`;
        }
    )
