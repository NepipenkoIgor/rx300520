import { interval, Observable, Subscriber } from "rxjs";
import { filter, tap } from "rxjs/operators";

function doNothing(source$: Observable<any>) {
    return source$
}

function toText(source$: Observable<any>) {
    return new Observable(subscriber => {
        subscriber.next('RxJS is Awesome!!!')
        subscriber.complete();
    })
}

class DoubleSubscriber extends Subscriber<number> {
    next(value: number): void {
        super.next(value * 2);
    }
}

const pipe =(...fns: Function[]) => (source: Observable<any>) => fns.reduce(
    (newSource, fn)=> fn(newSource), source
)

const filterWithDouble = pipe(
    filter((x: number) => x % 3 === 0),
    double,
)

function double(source$: Observable<any>) {
    return source$
        .lift({
            call(subscriber: Subscriber<unknown>, source: any): void {
                source.subscribe(new DoubleSubscriber(subscriber))
            }
        })
    // const o$ = new Observable();
    // o$.source = source$;
    // o$.operator = {
    //     call(subscriber: Subscriber<unknown>, source: any): void {
    //         source.subscribe(new DoubleSubscriber(subscriber))
    //     }
    // }
    // return o$
}

interval(1000)
    .pipe(
        filterWithDouble
    )
    .subscribe((v) => {
        console.log(v)
    }, () => {
    }, () => {
        console.log('complete')
    })


/*
  ---0---1---2---3---4---5--

 skipLimit(2,2)

 ------------2---3----------


 */
