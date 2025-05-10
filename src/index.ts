import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import productRoutes from './routes/productRoutes';
import { Product } from './entity/Product';
import cron from 'node-cron';
// import { scrapeAndSaveProducts } from './scraper';
import { scrapeAndSaveProducts } from './scrape';
import axios from 'axios';
dotenv.config();

const app = express();
app.use(cors());

app.use(productRoutes);

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT!,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [Product],
});

AppDataSource.initialize()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 3000}`);
    });
  })
  .catch((err) => console.error('DB connection error:', err));

  cron.schedule('0 */6 * * *', async () => {
  console.log('🕒 Running scheduled scraper...');
  await scrapeAndSaveProducts();
});