// create a class that implements the StockService interface from ./Service.ts
import { StockService } from "./Service";
import { Stock } from "../models/Stock";
import axios from 'axios'; // it needs to be manually installed
import dotenv from 'dotenv';
dotenv.config();

export class StockServiceImpl implements StockService {
    async getStock(ticker: string): Promise<Stock> {
        // use the  axios library to fetch the stock information from the Polygon.io API
        // wrap the axios call in a try/catch block to handle any errors
        let response;

        try {
            // call the Polygon.io API to fetch the stock information using the v3 reference tickers endpoint and passing the ticker parameter in the path and apiKey value as a query parameter
            response = await axios.get(`https://api.polygon.io/v3/reference/tickers?ticker=${ticker}&active=true&sort=ticker&order=asc&limit=50&apiKey=${process.env.POLYGON_API_KEY}`);

            // log the response to the console
            console.log(response);
        } catch (error) {
            // log the error to the console
            console.log(error);
            throw new Error("Invalid ticker symbol");
        }
        // extract the stock information from the response and check if response is defined
        if (!response) {
            // if the response is not defined, throw an error with message "Invalid ticker symbol"
            // log response to the console
            console.log("Invalid ticker symbol", response);
            throw new Error("Invalid ticker symbol");
        }
        
        const data = response.data;
        const stock = data.results[0];
        // log the stock information to the console
        console.log(stock);
        // return the stock result as a Stock object
        return {
            symbol: stock.ticker,
            name: stock.name,
            exchange: stock.primaryExchange,
            industry: stock.industry,
            sector: stock.sector,
            price: stock.lastSalePrice,
            change: stock.lastSalePrice - stock.prevDayClosePrice,
            changePercent: (stock.lastSalePrice - stock.prevDayClosePrice) / stock.prevDayClosePrice,
            marketCap: stock.marketCap,
            volume: stock.lastSaleSize, 
            avgVolume: stock.avgTotalVolume,
            isFavorite: false,
            isWatched: false,
            id: 0
        };

    }
}
