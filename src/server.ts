import mongoose from 'mongoose';
import app from './app';

mongoose
  .connect('mongodb://root:toor@127.0.0.1:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
    });
  });
