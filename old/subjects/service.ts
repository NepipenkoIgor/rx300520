import { BehaviorSubject, ReplaySubject, Subject } from "rxjs";

class DataService {
    private controlSequence$$ = new ReplaySubject();

    public getData() {
        return this.controlSequence$$.asObservable()
    }

    public sendData(data: any) {
        this.controlSequence$$.next(data);
    }
}

export const instance = new DataService();
