import './component-1';
import './component-2';
import { AsyncSubject, Observable } from "rxjs";
import { ajax } from "rxjs/ajax";


// const sequence = new AsyncSubject();
// sequence.subscribe((v)=>{
//     console.log('Sub 1', v)
// })
//
// sequence.next('Hi all');
// sequence.next('Rx JS');
// sequence.next('Redux');
// sequence.next('Node');
//
// setTimeout(()=>{
//     sequence.complete();
//     sequence.subscribe((v)=>{
//         console.log('Sub 2', v)
//     })
// },5000)
function getItems(url: string) {
    let subject: AsyncSubject<any>;
    return new Observable((subscriber) => {
        if (!subject) {
            subject = new AsyncSubject();
            ajax(url).subscribe(subject)
        }
        return subject.subscribe(subscriber)
    })
}
const items = getItems('http://learn.javascript.ru/courses/groups/api/participants?key=dsodaf')
items.subscribe((v)=>{
    console.log('User 1', v);
})
setTimeout(()=>{
    items.subscribe((v)=>{
        console.log('User 2', v);
    })
}, 5000)
