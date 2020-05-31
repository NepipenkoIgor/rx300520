import { fromEvent, iif, merge, Observable, of, zip } from "rxjs";
import { map, pluck, switchMap } from "rxjs/operators";


swipe(zip(
    getX(fromEvent<TouchEvent>(document, 'touchstart'),
        fromEvent<MouseEvent>(document, 'mousedown')
    ),
    getX(
        fromEvent<TouchEvent>(document, 'touchend'),
        fromEvent<MouseEvent>(document, 'mouseup')
    )
))
    .subscribe((direction) => {
        if (direction < 0) {
            console.log('Swipe Left');
            return;
        }
        console.log('Swipe Right');
    });

export function getX(source1$: Observable<TouchEvent >, source2$: Observable<MouseEvent>) {
    return merge(source1$, source2$)
        .pipe(
            // switchMap((event: TouchEvent | MouseEvent) => {
            //     return iif(
            //         () => event instanceof TouchEvent,
            //         of(event as TouchEvent).pipe(pluck('changedTouches', 0, 'clientX')),
            //         of(event as MouseEvent).pipe(pluck('clientX')),
            //     )
            // })
            map((event: TouchEvent | MouseEvent) => {
                if (event instanceof TouchEvent) {
                    return event.changedTouches[0].clientX
                }
                return event.clientX;
            })
        );
}

function swipe(source$: Observable<[number, number]>) {
    return source$
        .pipe(map(([x, y]) => y - x))
}
