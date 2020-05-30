//ReactiveX = iterator + observer + FP


// class CustomIterator {
//
//     private cursor = 0;
//     private value: number;
//
//     constructor(private arr: number[], private divisor = 1) {
//     }
//
//     public next() {
//         while (this.cursor < this.arr.length) {
//             this.value = this.arr[this.cursor++];
//             if (this.value % this.divisor === 0) {
//                 return {done: false, value: this.value}
//             }
//         }
//         return {done: true, value: this.value};
//     }
//
//     [Symbol.iterator]() {
//         return {
//             next: this.next.bind(this)
//         }
//     }
// }
//
// const consumer = new CustomIterator([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3)
//
//
// // console.log(consumer.next());
// // console.log(consumer.next());
// // console.log(consumer.next());
// // console.log(consumer.next());
// // console.log(consumer.next());
//
// for (let item of consumer) {
//     console.log('iteration 1', item);
// }
//
// Array.from(consumer).forEach((v) => {
//     console.log('iteration 2', v);
// })
interface IListener {
    next(message: string): void;
}

class Producer {
    private listeners: IListener[] = [];

    public subscribe(listener: IListener) {
        const index = this.listeners.push(listener);
        return {
            unsubscribe: () => {
                this.listeners.splice(index - 1, 1)
            }
        }
    }

    public notify(message: string) {
        this.listeners.forEach((listener) => {
            listener.next(message);
        })
    }
}

const listener1 = {
    next(message: string) {
        console.log('Listener 1', message);
    }
}

const listener2 = {
    next(message: string) {
        console.log('Listener 2', message);
    }
}


const notifier = new Producer();

const sub1 = notifier.subscribe(listener1);
const sub2 = notifier.subscribe(listener2);


notifier.notify('Hi all RxJS is awesome ');

sub1.unsubscribe();

setTimeout(() => {
    notifier.notify(' After unsubscribe ');
}, 5000);
