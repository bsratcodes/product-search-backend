"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Product_1 = require("../entity/Product");
const scrape_1 = require("../scrape");
const router = (0, express_1.Router)();
// router.get('/scrape', async (_req, res) => {
//   try {
//     const saved = await scrapeAndSaveProducts(200);
//     res.json({ success: true, message: `✅ Scraped and saved ${saved} new products` });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: 'Scraping failed' });
//   }
// });
router.get('/scrape', async (req, res) => {
    try {
        const result = await (0, scrape_1.scrapeAndSaveProducts)();
        res.json({ success: true, message: 'Scraping completed.', ...result });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});
// router.get('/api/products', async (req, res) => {
//   const { search = '', limit = '50' } = req.query;
//   const max = Math.min(Number(limit), 500);
//   try {
//     const products = await Product.createQueryBuilder('product')
//       .where('LOWER(product.name) LIKE :search', { search: `%${search.toString().toLowerCase()}%` })
//       .orderBy('product.id', 'DESC')
//       .limit(max)
//       .getMany();
//     res.json({ success: true, total: products.length, products });
//   } catch (err) {
//     res.status(500).json({ success: false, message: 'Fetch failed' });
//   }
// });
router.get('/api/products', async (req, res) => {
    const { search = '', page = '1', limit = '50' } = req.query;
    const pageNumber = Math.max(Number(page), 1);
    const pageSize = Math.min(Number(limit), 500);
    const skip = (pageNumber - 1) * pageSize;
    try {
        const queryBuilder = Product_1.Product.createQueryBuilder('product')
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
    }
    catch (err) {
        console.error('❌ Product fetch error:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch products from database.',
        });
    }
});
exports.default = router;
