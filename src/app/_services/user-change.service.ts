import {EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class UserChangeService {
    public itemAdded$: EventEmitter<string>;
    private imageUrl: string;

    constructor() {
        this.itemAdded$ = new EventEmitter();
    }

    public list(): string {
        return this.imageUrl;
    }

    public add(item: string): void {
        this.imageUrl = item;
        this.itemAdded$.emit(this.imageUrl);
    }
}
