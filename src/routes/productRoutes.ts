import { Router } from 'express';
import { Product } from '../entity/Product';
import { scrapeAndSaveProducts } from '../scrape';

const router = Router();

router.get('/scrape', async (req, res) => {
  try {
    const result = await scrapeAndSaveProducts();
    res.json({ success: true, message: 'Scraping completed.', ...result });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get('/api/products', async (req, res) => {
  const { search = '', page = '1', limit = '50' } = req.query;

  const pageNumber = Math.max(Number(page), 1);
  const pageSize = Math.min(Number(limit), 500);
  const skip = (pageNumber - 1) * pageSize;

  try {
    const queryBuilder = Product.createQueryBuilder('product')
      .where('LOWER(product.name) LIKE :search', { search: `%${search.toString().toLowerCase()}%` });

    const [products, total] = await queryBuilder
      .orderBy('product.id', 'DESC')
      .skip(skip)
      .take(pageSize)
      .getManyAndCount();

    res.json({
      success: true,
      total,
      page: pageNumber,
      limit: pageSize,
      products,
    });
  } catch (err) {
    console.error('❌ Product fetch error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products from database.',
    });
  }
});


export default router;
