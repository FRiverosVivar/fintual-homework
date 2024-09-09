import {PriceTimeline, Stock} from "./model/stock";
import {Portfolio} from "./model/portfolio";
import {DateTime} from "luxon";

function __main__(): void {
    const stock1Prices = new PriceTimeline([
        ['2023-09-01', 100],
        ['2023-09-10', 110],
        ['2023-09-20', 120],
    ]);

    const stock2Prices = new PriceTimeline([
        ['2023-09-01', 200],
        ['2023-09-10', 210],
        ['2023-09-20', 205],
    ]);

    const stock1 = new Stock('Stock1', stock1Prices);
    const stock2 = new Stock('Stock2', stock2Prices);

    const portfolio = new Portfolio();
    portfolio.addStock(stock1);
    portfolio.addStock(stock2);

    const startDate = DateTime.fromISO('2023-09-01');
    const endDate = DateTime.fromISO('2024-09-30');

    if(!startDate.isValid || !endDate.isValid || startDate > endDate)
        return console.log(`Invalid date range >> ${!startDate.isValid ? 'start date' : ''}${!startDate.isValid && !endDate.isValid ? ' & ' : ''}${!endDate.isValid ? 'end date' : ''} <<`);

    const profit = portfolio.calculateProfit(startDate, endDate);
    console.log(`Portfolio annual return between ${startDate.toISO()!.split("T")[0]} and ${endDate.toISO()!.split("T")[0]}: ${(profit * 100).toFixed(3)}%`);
}

__main__();
