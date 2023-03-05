import { Stock } from "../models/Stock";

// create an interface that defines the methods that the StockService class must implement
export interface StockService {
    getStock(ticker: string): Promise<Stock>;
}