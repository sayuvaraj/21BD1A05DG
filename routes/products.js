import express from 'express';
import { getProducts, getProductById } from '../services/ecommerce.js';

const router = express.Router();

router.get('/:categoryname/products', async (req, res) => {
  const { categoryname } = req.params;
  const { n, page = 1, sort, order = 'asc', minPrice = 0, maxPrice = 1000000 } = req.query;

  if (!n || isNaN(n) || n < 1) {
    return res.status(400).json({ error: 'Invalid number of products requested' });
  }

  try {
    const products = await getProducts(categoryname, parseInt(n), parseInt(page), sort, order, minPrice, maxPrice);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching products' });
  }
});

router.get('/:categoryname/products/:productid', async (req, res) => {
  const { categoryname, productid } = req.params;

  try {
    const product = await getProductById(categoryname, productid);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching product details' });
  }
});

export default router;
