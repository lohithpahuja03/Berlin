import { Request, Response } from 'express';
import { db } from '../models/db.js';

export const getCategories = (_req: Request, res: Response): void => {
  res.json({
    success: true,
    categories: db.getCategories(),
  });
};

export const getProducts = (req: Request, res: Response): void => {
  const { category, search, bestseller } = req.query;

  let products = db.getProducts();

  if (category && typeof category === 'string') {
    products = db.getProductsByCategory(category);
  }

  if (search && typeof search === 'string') {
    products = db.searchProducts(search);
  }

  if (bestseller === 'true') {
    products = products.filter((p) => p.isBestSeller);
  }

  res.json({
    success: true,
    count: products.length,
    products,
  });
};

export const getProductById = (req: Request, res: Response): void => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const product = db.getProductById(id);
  if (!product) {
    res.status(404).json({ success: false, error: 'Product not found.' });
    return;
  }
  res.json({ success: true, product });
};
