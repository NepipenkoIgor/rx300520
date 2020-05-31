import { EMPTY, fromEvent, interval, of, zip } from "rxjs";
import { catchError, delay, map, retry, retryWhen, switchMap, tap } from "rxjs/operators";

const sequence1$ = interval(1000);
const sequence2$ = of('1', '2', '3', 4, '5', '6', '7');

const sequence = zip(sequence1$, sequence2$);

fromEvent(document, 'click')
    .pipe(
        switchMap(()=>{
             return sequence
                 .pipe(
                     // map(([_x, y]: [number, number | string]) => {
                     //     // try {
                     //     //     return (y as any).toUpperCase()
                     //     // } catch (err) {
                     //     //     console.log(err);
                     //     //     return '0';
                     //     // }
                     //     return (y as any).toUpperCase()
                     // }),
                     switchMap(([_x, y]: [number, number | string]) => {
                         return of(y)
                             .pipe(
                                 map((y) => {
                                     return (y as any).toUpperCase()
                                 })
                             )
                     }),
                     // tap(() => {
                     //     console.log('without error')
                     // }),
                     //retry(3),
                     // retryWhen(errObs => errObs.pipe(delay(5000))),
                     // catchError((err) => {
                     //     console.log('CATCH err', err);
                     //     return EMPTY
                     // }),
                     // tap(() => {
                     //     console.log('AFTER CATCH error')
                     // }),
                 )
        }),
        catchError((err) => {
            console.log('CATCH err', err);
            return EMPTY
        }),
    )

    .subscribe((v) => {
        console.log(v);
    }, (err) => {
        console.log(' ERR', err);
    }, () => {
        console.log('completed')
    })


// const pingEpic = action$ => action$.pipe(
//     filter(action => action.type === 'LOGIN'),
//     switchMap((user)=> service.login(user)
//         .pipe(
//             mergeMap(()=> [JWTLocalStorage, SetUser, LoginSuccess, GO]),
//             catchError(()=>EMPTY)
//         )
//     ),
// );
