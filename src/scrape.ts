import axios from 'axios';
import * as cheerio from 'cheerio';
import { Product } from './entity/Product';

const BASE_URL = 'https://ethio.shop/shop/?eshop_product_tag=blouses&product-page=';
const HOST = 'https://ethio.shop';

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

async function fetchWithRetry(url: string, retries = 3): Promise<string | null> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const { data } = await axios.get(url, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        timeout: 30000, // 30 seconds
      });
      return data;
    } catch (err: any) {
      console.warn(`⚠️ Attempt ${attempt} failed for ${url}: ${err.message}`);
      if (attempt < retries) await sleep(attempt * 1000); // Exponential backoff
    }
  }
  console.error(`❌ All ${retries} attempts failed for ${url}`);
  return null;
}

export const scrapeAndSaveProducts = async (limit = 1500) => {
  let page = 1;
  let count = 0;
  let updated = 0;
  let skipped = 0;

  while (count + updated < limit) {
    const url = `${BASE_URL}${page}`;
    console.log(`🔍 Scraping: ${url}`);

    const html = await fetchWithRetry(url);
    if (!html) break;

    const $ = cheerio.load(html);
    const productElements = $('.product').toArray();

    if (productElements.length === 0) {
      console.log('🚫 No products found. Stopping...');
      break;
    }

    for (const el of productElements) {
      if (count + updated >= limit) break;

      const titleAnchor = $(el).find('.ht-product-title a');
      const priceText = $(el).find('.price').first().text().trim();
      if (!titleAnchor.length || !priceText) continue;

      const name = titleAnchor.text().trim();
      let link = titleAnchor.attr('href')?.trim() || '';
      let image = $(el).find('img').attr('src') || '';
      if (link.startsWith('/')) link = HOST + link;
      if (image && !image.startsWith('http')) image = HOST + image;

      const existing = await Product.findOneBy({ link });
      if (existing) {
        if (existing.price !== priceText || existing.name !== name) {
          existing.name = name;
          existing.price = priceText;
          existing.image = image;
          await existing.save();
          console.log(`♻️ Updated: ${name}`);
          updated++;
        } else {
          skipped++;
        }
      } else {
        const product = Product.create({ name, price: priceText, image, link });
        await product.save();
        console.log(`✅ Saved: ${name}`);
        count++;
      }
    }

    page++;
    await sleep(1500); // Delay between pages (1.5s)
  }

  console.log(`✅ Done. New: ${count}, Updated: ${updated}, Skipped: ${skipped}`);
  return { new: count, updated, skipped };
};
