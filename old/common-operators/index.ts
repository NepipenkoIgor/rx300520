import { fromEvent, interval } from "rxjs";
import { debounceTime, filter, first, map, pluck, skip, take, tap } from "rxjs/operators";


const sequence1$ = interval(1000);

/*
    sequence1$  ---0---1---2---3---4---5---
        map((x)=> ({v: x}))
                ---{v: 0}---{v: 1}---{v: 2}---{v: 3}---{v: 4}---{v: 5}---
        tap((v)=> {
            console.log(v)
            return [1,2,3,4];
        })
                ---{v: 0}---{v: 1}---{v: 2}---{v: 3}---{v: 4}---{v: 5}---
        pluck('v')
                ---0---1---2---3---4---5---
        filter((x)=>x%2===0)
                ---0-------2-------4-------
        map((x)=>x**2)
                ---0-------4-------16-------
        skip(2)
                -------------------16-------
        take(1)
    sequence2$  -------------------16|
 */

sequence1$
    .pipe(
        map((x) => ({v: x})),
        tap((v) => {
            // console.log(v)
            return [1, 2, 3, 4];
        }),
        pluck('v'),
        filter((x) => x % 2 === 0),
        map((x) => x ** 2),
        skip(2),
        first()
    )
    .subscribe((v) => {
        console.log('Result', v);
    }, () => {
    }, () => {
        console.log('completed')
    })


const el = document.querySelector('input') as HTMLInputElement;

fromEvent(el, 'input')
    .pipe(
        debounceTime(300),
        pluck('target', 'value')
    )
    .subscribe((v) => {
        console.log(v);
    })
