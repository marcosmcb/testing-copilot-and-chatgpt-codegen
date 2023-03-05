// write a server application that listens on port 3000 and responds with a JSON object
import express from 'express';
import { StockControllerImpl } from './controllers/StockController';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT;



// configure the app to listen on port 3000
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

// configure the app to support JSON objects
app.use(express.json());

// configure the app to support URL-encoded bodies
app.use(express.urlencoded({ extended: true }));


// create a get endpoint that implements the /stock-info endpoint frm the API specification
app.get('/stock-info', async (req, res) => {
    
    // get the ticker parameter from the request query parameters
    const ticker = req.query.ticker;

    // using the ticker parameter, fetch the stock information from Stock Controller and return the stock information as a JSON object
    const controller = new StockControllerImpl();

    // wrap call to controller.getStock() in a try/catch block to handle any errors
    try {
        // log the ticker parameter to the console
        console.log(ticker);
        const stock = await controller.getStock(ticker as string);
        // return response using status code 200
        res.status(200).json(stock);
    } catch (error) {
        // log the error to the console
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});