import { combineLatest, fromEvent, Observable } from "rxjs";
import { map, pluck, startWith, tap, withLatestFrom } from "rxjs/operators";

const quality$ = getValue(fromEvent($('#quality').slider(), 'change'));
const rating$ = getValue(fromEvent($('#rating').slider(), 'change'));
const actual$ = getValue(fromEvent($('#actual').slider(), 'change'));

const slideSequence$ = combineLatest([
    quality$,
    rating$,
    actual$
])
    .pipe(
        map(([quality, rating, actual]) => {
            return Math.round((quality + rating + actual) / 3 * 10)
        })
    );

fromEvent<MouseEvent>(
    document.querySelector('#send-result') as HTMLButtonElement,
    'click'
)
    .pipe(
        withLatestFrom(slideSequence$)
    )
    .subscribe(([_e, value]) => {
        console.log(value);
    })

function getValue(source$: Observable<any>) {
    return source$
        .pipe(
            map(({delegateTarget: {previousElementSibling}, value: {newValue}}: any) => {
                return {
                    element: previousElementSibling,
                    value: newValue
                }
            }),
            tap(redrawSlider),
            pluck('value'),
            startWith(5)
        )
}

function redrawSlider({element, value}: any) {
    const sliderTrack = element.querySelector('.slider-track');
    const v = value * 10;
    sliderTrack.classList.remove('bad', 'warn', 'good');
    if (v < 40) {
        sliderTrack.classList.add('bad');
        return
    }
    if (v > 40 && v < 70) {
        sliderTrack.classList.add('warn');
        return
    }
    sliderTrack.classList.add('good');
}
