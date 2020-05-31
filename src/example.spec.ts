import { TestScheduler } from "rxjs/testing";
import { delay, skipLimit } from "./example";
import { map } from "rxjs/operators";

describe('RxJS', () => {

    let testScheduler: TestScheduler;

    beforeEach(() => {
        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        })
    })

    it('delay should work ', () => {
        testScheduler.run(({cold, expectObservable}) => {
            const sequence1 = cold('-a--b--c---|', {
                a: 2,
                b: 2,
                c: 10
            })

            const sequence = '              9s -a--b--c---|';
            expectObservable(
                sequence1
                    .pipe(
                        delay(9000),
                        map((x) => x ** 2)
                    )
            ).toBe(sequence, {a: 4, b: 4, c: 100})

        });
    })

    it('skipLimit should work ', () => {
        testScheduler.run(({cold, expectObservable}) => {
            const sequence1 = cold('-a--b----c----d---e-|', {
                a: 2,
                b: 2,
                c: 10,
                d: 33,
                e: 44
            })

            const sequence = '---------c----d-----|';
            expectObservable(
                sequence1
                    .pipe(
                        skipLimit(2, 2)
                    )
            ).toBe(sequence, {c: 10, d: 33})

        });
    })
})
