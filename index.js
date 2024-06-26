import express from 'express';
import productRoutes from './routes/products.js';

const app = express();

app.use(productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
