import { combineLatest, EMPTY, fromEvent, Observable, of } from "rxjs";
import { debounceTime, pluck, switchMap, withLatestFrom } from "rxjs/operators";
import { userService } from "./user.service";


export class CreateForm {
    public valueSequence$: Observable<any>;

    private input: HTMLInputElement;
    private saveButton: HTMLButtonElement;

    public constructor(
        public formContainer: HTMLFormElement
    ) {
        this.input = formContainer.querySelector('input') as HTMLInputElement;
        this.saveButton = formContainer.querySelector('button') as HTMLButtonElement;

        this.valueSequence$ = combineLatest(
            fromEvent<InputEvent>(this.input, 'input').pipe(pluck('target', 'value')),
            userService.getNames()
        ).pipe(
            debounceTime(300),
            switchMap(([value, names]: any) => {
                const isNotValid = names.find((name: string) => name === value);
                if (isNotValid) {
                    this.input.classList.add('error');
                    this.saveButton.disabled = true;
                    return EMPTY;
                }
                this.input.classList.remove('error');
                this.saveButton.disabled = false;
                return of(value)
            })
        )

        fromEvent<MouseEvent>(this.saveButton, 'click')
            .pipe(
                withLatestFrom(this.valueSequence$),
            ).subscribe((value) => {
            console.log(value)
        })


    }
}
