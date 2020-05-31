import { TestScheduler } from "rxjs/testing";
import { delay, skipLimit } from "./example";
import { map } from "rxjs/operators";
import { getX } from "./swipe";

function createTouchEvent(clientX: number) {
    return new TouchEvent('event', {
        changedTouches: [new Touch({clientX, identifier: 1, target: new EventTarget()})]
    })
}

function createMouseEvent(clientX: number) {
    return new MouseEvent('event', {
        clientX
    })
}

describe('Swipe test', () => {

    let testScheduler: TestScheduler;

    beforeEach(() => {
        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        })
    })

    it(' getX should transform right ', () => {
        testScheduler.run(({hot, expectObservable}) => {
            const touch$ = hot('-a--b----c--|', {
                a: createTouchEvent(10),
                b: createTouchEvent(20),
                c: createTouchEvent(1)
            });

            const mouseDown$ = hot('------e-----|', {
                e: createMouseEvent(10),
            });

            const sequence = '-a--b-e--c--|';
            expectObservable(
               getX(touch$, mouseDown$)
            ).toBe(sequence, {a: 10, b: 20, c: 1, e: 10})

        });
    })

})
