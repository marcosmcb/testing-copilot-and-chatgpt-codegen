// create a stock controller class that implements the StockController interface from ./Controller.ts
import { StockController } from "./Controller";
import { StockService } from "../services/Service";
import { StockServiceImpl } from "../services/StockService";
import { Stock } from "../models/Stock";

export class StockControllerImpl implements StockController {
    stockService: StockService;

    constructor() {
        this.stockService = new StockServiceImpl();
    }

    async getStock(ticker: string): Promise<Stock> {
        // validate the ticker symbol against a regular expression that matches the format of a stock ticker symbol
        // the regular expression is defined in the openapi/stock-screeener.yaml file
        const regex = new RegExp("^[A-Z]{1,5}$");   
    
        if (!regex.test(ticker)) {
            // log the error to the console and regex evaluation
            console.log("Invalid ticker symbol", regex.test(ticker));
            throw new Error("Invalid ticker symbol");
        }
        
        return await this.stockService.getStock(ticker);
    }
}