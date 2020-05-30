// import { Observable } from "rxjs";
//
import { Observable } from "rxjs";

const socket: WebSocket = new WebSocket('wss://echo.websocket.org');
const sequence$ = new Observable((subscriber) => {
    socket.addEventListener('message', (e) => subscriber.next(e))


    // let count = 1;
    // const intervalId = setInterval(() => {
    //     // if (count % 5 === 0) {
    //     //     clearInterval(intervalId);
    //     //     subscriber.complete();
    //     //     return
    //     // }
    //     subscriber.next(count++);
    // }, 1000)
    // return () => {
    //     console.log('unsubscribe');
    //     clearInterval(intervalId);
    // }
});
//
// const subscription = sequence$.subscribe((v) => {
//     console.log(v);
// }, () => {
// }, () => {
//     console.log('completed')
// })
//
// setInterval(() => {
//     subscription.unsubscribe();
// }, 3000)

// import { fromEvent, interval } from "rxjs";
//
//const sequence$ = fromEvent<MouseEvent>(document, 'click');

const sub1 = sequence$.subscribe((v: any) => {
    console.log('Sub 1', v.data);
});
socket.addEventListener('open', () => {
    let count = 1;
    const intervalId = setInterval(() => {
        socket.send((count++).toString())
    }, 1000)
})


setTimeout(() => {
    sequence$.subscribe((v: any) => {
        console.log('Sub 2', v.data);
    })
}, 5000)
