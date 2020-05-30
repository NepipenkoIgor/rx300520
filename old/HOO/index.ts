import { fromEvent, interval, of } from "rxjs";
import {
    concatAll,
    debounceTime, exhaust,
    exhaustMap,
    map,
    mergeAll,
    mergeMap,
    pluck,
    switchAll,
    switchMap
} from "rxjs/operators";
import { ajax } from "rxjs/ajax";


// interval(2000)
//     .pipe(
//         map((v) => {
//             return of(v * 2)
//         })
//     )
//     .subscribe((v) => {
//         v.subscribe((x) => {
//             console.log(x);
//         })
//     })


const inputEl = document.querySelector('input') as HTMLInputElement;
const sequence = fromEvent(inputEl, 'input')
    .pipe(
        map((e) => {
            const value = (e.target as HTMLInputElement).value;
            return ajax(`http://learn.javascript.ru/courses/groups/api/participants?key=dsodaf`)
        }),
        exhaust(),
        // map + mergeALl = mergeMap
        // map + switchAll = switchMap
        // map + concatAll = concatMap
        // map + exhaust = exhaustMap
        pluck('response')
    )
    .subscribe((value) => {
        console.log(value);
    })
