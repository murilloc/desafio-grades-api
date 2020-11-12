import express from 'express';
import bodyParser from 'body-parser';
import {gradeRouter} from './routes/gradeRouter.js';
import cors from 'cors';


import { db } from './models/index.js';


(async () => {
  try {
    if (process.env.NODE_ENV === 'development') {

      console.log('Connecting to Local Database');
      await db.mongoose.connect(db.url, {
        auth: {
          authSource: "admin"
        },
        user: db.user,
        pass: db.password,
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('Local database connected!');
    } else /*if (process.env.NODE_ENV === 'development')*/ {
      console.log('Connecting to cloud Database:' + db.url);
      await db.mongoose.connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('Cloud database connected!');
    }
  } catch (error) {
    console.log('MongoDb Connection failure:' + error);
  }

})();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//define o dominio de origem para consumo do servico
app.use(cors());
// app.use(
//   cors({
//     origin: 'http://localhost:8087',
//   })
// );

app.use('/',gradeRouter);
app.get('/', (req, res) => {
  res.send('API em execucao');
});

app.listen(process.env.PORT || 8087, () => {});
