import { EMPTY, fromEvent, Observable } from "rxjs";
import {
    bufferCount, catchError,
    concatAll,
    debounceTime,
    distinctUntilChanged,
    filter,
    map,
    pluck, reduce,
    switchMap
} from "rxjs/operators";

export interface IResult {
    name: string;
    description: string;
    owner: {
        avatar_url: string;
    }
}

export function liveSearch(
    source$: Observable<KeyboardEvent>,
    request: (text: string) => Observable<any>
) {
    return source$
        .pipe(
            debounceTime(300),
            pluck<KeyboardEvent, string>('target', 'value'),
            map((value) => value.trim()),
            filter((value: string) => value.length > 3),
            distinctUntilChanged(),
            switchMap(request),
        )
}


export function request(source$: Observable<any>) {
    return source$.pipe(
        pluck<any, IResult[]>('response', 'items'),
        concatAll(),
        map(createCart),
        bufferCount(3),
        reduce((resultStr: string, htmlStrs: string[]) => {
            return resultStr += createRow(htmlStrs)
        }, ''),
        map((htmlStr) => htmlStr.trim().replace(/\s+(<)/g, '<')),
        catchError((err) => {
            console.log('CATCH err', err);
            return ''
        }),
    )
}

export function createCart({name, description, owner: {avatar_url}}: IResult) {
    return `
     <div class="col-md-4">
        <div class="card">
          <img class="card-img-top" src=${avatar_url} alt=${name} />
          <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">${description}</p>
          </div>
        </div>
     </div>
  `
}


export function createRow(htmlStrings: string[]) {
    return `
      <div class="row">
       ${htmlStrings.join(' ')}
      </div>
   `
}
