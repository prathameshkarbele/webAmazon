import express from "express";
import { config } from "dotenv";
import { ConntectDb } from "./Databse/conn.js";
import { Products } from "./Model/productsSchema.js";
import { DefaultData } from "./Defaultdata.js";
import cors from "cors"
import  {router}  from "./Routes/Route.js";
import cookieParser from "cookie-parser";


config({
  path: "./Databse/config.env",
  
});
ConntectDb();

const app = express();

app.use(express.json())
app.use( cookieParser(""))
app.use(cors())

app.use(router)


const port = process.env.PORT ||  4001;


// for deployment
if(process.env.NODE_ENV === 'production'){
 

  app.use(express.static("client/build"))
}

app.listen(port, async(req, res) => {
  console.log(`server is running on port number ${port}`);
  await DefaultData()
});
