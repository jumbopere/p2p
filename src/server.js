import express from "express"
import { json, urlencoded} from "body-parser";
import cors from "cors"

import db from "./config/db";
import config from "./config";
import { userRoute } from "./routes";


const app = express()
const PORT = process.env.PORT || 4000

const flame =  String.fromCodePoint(0x1F525)

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

 db(config)
.then(()=> {
  app.get('/', (req, res) => {
    res
    .status(200)
    .send({ message: "Welcome to the P2P API" });
   
  })
    app.use('/user', userRoute(express));
    app.get('*', (req, res) => {
      res
      .status(404)
      .send({ message: "you are trying to access an unknown route" });
  });
    app.listen(PORT, (err) => {
        if (err) {
          throw new Error(err.message);
        }
        console.log(`server is running on port ${PORT} ${flame}`);
      });
}).catch((err) => {
    throw new Error(err.message);
  })

export default app