import { combineLatest, from, of, Subject } from "rxjs";
import { async } from "rxjs/internal/scheduler/async";
import { asap } from "rxjs/internal/scheduler/asap";
import { map, observeOn, take } from "rxjs/operators";
import { queue } from "rxjs/internal/scheduler/queue";

// console.log('start');
// setTimeout(() => console.log('timeout 1'));
// setTimeout(() => console.log('timeout 2'));
// Promise.resolve().then(() => console.log('promise 1'));
// Promise.resolve().then(() => console.log('promise 2'));
// console.log('end');

// task1 ---- task2  ---- task3
// start     timeout 1   timeout 2
// end
// promise1
// promise 2

// micro - asap
// macro - async
// queue

// console.log('start');
// of(1, 2, 3, 4, asap )
//     .subscribe((v) => {
//         console.log(v);
//     });
// console.log('end');

// const a$ = from([1, 2], asap);
// const b$ = of(10);
//
// const c$ = combineLatest([a$, b$])
//     .pipe(map(([a, b]) => a + b));
//
// c$.subscribe((v) => {
//     console.log(v);
// })

const signal = new Subject<number>();
let count = 0;
const calc = (count: number) => console.log('do some calc ', count)
console.log('start');
signal.pipe(
    observeOn(queue),
    take(1600),

)
    .subscribe((v: number) => {
        calc(v);
        signal.next(v++);
    })
signal.next(count++);
console.log('end');
