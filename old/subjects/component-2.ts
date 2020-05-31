import { instance } from './service';

instance.getData().subscribe((v) => {
    console.log(v);
})
