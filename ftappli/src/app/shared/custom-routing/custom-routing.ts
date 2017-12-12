export class CustomRouting {
    current: string;
    previous: string[];

    constructor(previous, current) {
        this.current = current;
        this.previous = previous;
    }
}