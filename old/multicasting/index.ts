import { ConnectableObservable, interval, ReplaySubject, Subject } from "rxjs";
import { multicast, publish, refCount, share } from "rxjs/operators";

//const control = new ReplaySubject(2);
const sequence = interval(1000)
    .pipe(
        //multicast(control)
        //publish(), //new Subject + multicast(control)
        // refCount()
        share()
    ) //as ConnectableObservable<any>;
// sequence.connect();
const sub1 = sequence.subscribe((v) => {
    console.log('Sub 1', v);
})
setTimeout(() => {
    sub1.unsubscribe();
}, 3000)

setTimeout(() => {
    sequence.subscribe((v) => {
        console.log('Sub 2', v);
    })
}, 5000)

setTimeout(() => {
    sequence.subscribe((v) => {
        console.log('Sub 3', v);
    })
}, 7000)
