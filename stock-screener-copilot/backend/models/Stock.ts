// create a stock model interface using the API specification from ../openapi/stock-screeener.yaml
export interface Stock {
    id: number;
    name: string;
    symbol: string;
    price: number;
    change: number;
    changePercent: number;
    marketCap: number;
    volume: number;
    avgVolume: number;
    exchange: string;
    sector: string;
    industry: string;

    // the following fields are not part of the API specification
    // but are added to the model to support the frontend
    // and are not persisted in the database
    isFavorite: boolean;
    isWatched: boolean;
}
