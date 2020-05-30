import { fromEvent, interval } from "rxjs";
import { skipLimit } from "./skip-limit";
import { pluck } from "rxjs/operators";


fromEvent(document, 'click')
    .pipe(
        pluck('clientX'),
        skipLimit(3, 4)
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
