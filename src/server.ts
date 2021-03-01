import mongoose from 'mongoose';
import app from './app';
import Config from './config/config';

const MONGO_URI = Config.mongo.uri;
const APP_HOST = Config.app.host;
const APP_PORT = Config.app.port;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(APP_PORT, APP_HOST, () => {
      console.log(`⚡️[server]: Server is running at https://${APP_HOST}:${APP_PORT}`);
    });
  })
  .catch(err => {
    console.log('Could not connect to database');
    console.error(err);
  });
