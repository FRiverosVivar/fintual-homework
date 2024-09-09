import {Stock} from "./stock";
import {DateTime} from "luxon";

export type StockResume = {
    initialPrice: number;
    finalPrice: number;
}
export type PortfolioResume = {
    initialInvestment: number;
    finalInvestmentProfit: number;
}
export class Portfolio {
    private _stocks: Stock[];
    constructor() {
        this._stocks = [];
    }

    get stocks(): Stock[] {
        return this._stocks;
    }

    set stocks(value: Stock[]) {
        this._stocks = value;
    }

    public addStock(stock: Stock): void {
        this._stocks.push(stock);
    }

    public calculateProfit(startDate: DateTime, endDate: DateTime): number {
        const {initialInvestment, finalInvestmentProfit} = this.getPortfolioInitialAndFinalPriceByGivenDate(startDate, endDate);
        const totalReturn = ((finalInvestmentProfit - initialInvestment) / initialInvestment)
        const years = (endDate.diff(startDate, 'days').days / 365);
        return Math.pow(1 + totalReturn, (1 / years)) - 1;
    }
    private getPortfolioInitialAndFinalPriceByGivenDate(startDate: DateTime, endDate: DateTime): PortfolioResume {
        let initialInvestment = 0
        let finalInvestmentProfit = 0
        this.stocks.forEach((stock) => {
            const {initialPrice, finalPrice} = this.getInitialAndFinalStockPriceByGivenDate(stock, startDate, endDate);
            initialInvestment += initialPrice ?? 0
            finalInvestmentProfit += finalPrice ?? 0
        });

        return {initialInvestment, finalInvestmentProfit}
    }
    private getInitialAndFinalStockPriceByGivenDate(stock: Stock, startDate: DateTime, endDate: DateTime): StockResume {
        let currentDate = startDate;
        let initialPrice = stock.getPrice(currentDate.toISO()!);
        let finalPrice
        while (currentDate <= endDate) {
            const nextDate = stock.getNextPriceDate(currentDate.toISO()!, endDate.toISO()!);
            if (nextDate === null) break;

            const nextPrice = stock.getPrice(nextDate.toISO()!);
            currentDate = nextDate;
            finalPrice = nextPrice;
        }

        return {initialPrice: initialPrice ?? 0, finalPrice: finalPrice ?? 0}
    }

}