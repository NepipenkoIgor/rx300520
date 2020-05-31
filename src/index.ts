import { defer, interval } from "rxjs";
import { animationFrame } from "rxjs/internal/scheduler/animationFrame";
import { map, takeWhile, tap } from "rxjs/operators";

const div = document.querySelector('div') as HTMLDivElement;

// interval(0, animationFrame)
//     .subscribe((v) => {
//         div.style.transform = `translate3d(0,${v}px,0)`
//     })

function msElapsed(schedule = animationFrame) {
    return defer(() => {
        const start = schedule.now();
        return interval(0, schedule)
            .pipe(map(() => schedule.now() - start))
    })
}

function duration(ms: number, schedule = animationFrame) {
    return msElapsed(schedule)
        .pipe(
            map((time) => {
                return time / ms;
            }),
            takeWhile((percentage) => percentage <= 1)
        )
}

function distance(px: number) {
    return (percentage: number) => percentage * px;
}

const animationFn = (percentage: number) => {
    return Math.sin(-13 * (percentage + 1) * Math.PI * 2) * Math.pow(2, -10 * percentage) + 1;
}


function animateDown(element: HTMLDivElement) {
    return duration(20000)
        .pipe(
            map(animationFn),
            map(distance(100)),
            tap((frame) => {
                element.style.transform = `translate3d(0,${frame}px,0)`
            })
        )
}

animateDown(div)
    .subscribe(() => {
    }, () => {
    }, () => {
        console.log('animation completed')
    })
