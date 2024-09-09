import {DateTime} from "luxon";

export class PriceTimeline extends Map<string, number>{}
export class Stock {
    private _name: string;
    private _priceTimeline: PriceTimeline;

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get priceTimeline(): PriceTimeline {
        return this._priceTimeline;
    }

    set priceTimeline(value: PriceTimeline) {
        this._priceTimeline = value;
    }

    constructor(name: string, priceHistory: PriceTimeline) {
        this._name = name;
        this._priceTimeline = priceHistory;
    }

    public getPrice(queryDate: string): number | null {
        const date = DateTime.fromISO(queryDate);
        return this._priceTimeline.get(date.toISO()!.split("T")[0]) || null;
    }
    public getNextPriceDate(currentDate: string, endDate: string): DateTime | null {
        let nextDate = DateTime.fromISO(currentDate).plus({ days: 1 });
        const endDateTime = DateTime.fromISO(endDate)
        while (nextDate <= endDateTime) {
            const nextPrice = this.getPrice(nextDate.toISO()!);
            if (nextPrice !== null) {
                return nextDate;
            }
            nextDate = nextDate.plus({ days: 1 });
        }

        return null;
    }
}