import {Observable, Subscriber } from "rxjs";

class SkipLimitSubscriber extends Subscriber<any> {

    private interval: number = 1;
    private count: number = 1;

    constructor(
        subscribe: Subscriber<any>,
        private skip: number,
        private limit: number
    ) {
        super(subscribe);
    }

    next(value: any): void {
        const borderLeft = this.interval * (this.skip + this.limit) - this.limit;
        const borderRight = borderLeft + this.limit;
        if (borderLeft < this.count && this.count <= borderRight) {
            super.next(value);
            this.count++;
            if (borderRight < this.count) {
                this.interval++;
            }
            return
        }
        this.count++;

    }
}

export function skipLimit(skip: number, limit: number) {
    return (source$: Observable<any>) => {
        return source$
            .lift({
                call(subscriber: Subscriber<unknown>, source: any): void {
                    source.subscribe(new SkipLimitSubscriber(subscriber, skip, limit))
                }
            })
    }
}
