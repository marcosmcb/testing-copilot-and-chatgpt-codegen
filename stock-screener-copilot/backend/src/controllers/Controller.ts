// create a stock controller interface that defines the methods that the StockController class must implement
import { Stock } from "../models/Stock";

export interface StockController {
    getStock(ticker: string): Promise<Stock>;
}
