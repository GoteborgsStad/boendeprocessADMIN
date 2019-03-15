import { Injectable } from '@angular/core';

@Injectable()
export class SharingService {
    private data: any = undefined;

    public setData(data: any) {
        // console.log("setData", data);
        this.data = data;
    }

    public getData(): any {
        // console.log("getting", this.data);
        return this.data;
    }
}
