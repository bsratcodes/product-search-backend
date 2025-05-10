"use strict";
// import axios from 'axios';
// import * as cheerio from 'cheerio';
// import { Product } from './entity/Product';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeAndSaveProducts = void 0;
// const BASE_URL = 'https://ethio.shop/shop/?eshop_product_tag=blouses&product-page=';
// const HOST = 'https://ethio.shop';
// export const scrapeAndSaveProducts = async (limit = 110) => {
//   let page = 1;
//   let count = 0;
//   while (count < limit) {
//     const url = `${BASE_URL}${page}`;
//     console.log(`🔍 Scraping: ${url}`);
//     try {
//       const { data } = await axios.get(url, {
//         headers: {
//           'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
//         },
//         timeout: 10000,
//       });
//       const $ = cheerio.load(data);
//       const productElements = $('.product').toArray();
//       console.log(`🛒 Found ${productElements.length} products on page ${page}`);
//       let found = 0;
//       for (const el of productElements) {
//         if (count >= limit) break;
//         const titleAnchor = $(el).find('.ht-product-title a');
//         const priceText = $(el).find('.price').first().text().trim();
//         if (!titleAnchor.length || !priceText) {
//           // Skip malformed or duplicate product card
//           continue;
//         }
//         const name = titleAnchor.text().trim();
//         let link = titleAnchor.attr('href')?.trim() || '';
//         let image = $(el).find('img').attr('src') || '';
//         // Normalize URLs
//         if (link.startsWith('/')) link = HOST + link;
//         if (image && !image.startsWith('http')) image = HOST + image;
//         console.log(`➡️ Product parsed:`, { name, price: priceText, link });
//         if (name && link) {
//           const existing = await Product.findOneBy({ link });
//           if (existing) {
//             console.log(`🔁 Skipped (already exists): ${name}`);
//           } else {
//             const product = Product.create({
//               name,
//               price: priceText,
//               image,
//               link,
//             });
//             await product.save();
//             console.log(`✅ Saved: ${name}`);
//             count++;
//             found++;
//           }
//         } else {
//           console.log(`⚠️ Skipped: Missing name or link`, { name, link });
//         }
//       }
//       if (found === 0) {
//         console.log('⚠️ No new products found. Stopping...');
//         break;
//       }
//       page++;
//       await new Promise((res) => setTimeout(res, 1000)); // 1s delay
//     } catch (err: any) {
//       console.error(`❌ Error scraping page ${page}:`, err.message);
//       break;
//     }
//   }
//   return count;
// };
// export const scrapeAndSaveProducts = async (limit = 1500) => {
//   let page = 1;
//   let count = 0;
//   let updated = 0;
//   let skipped = 0;
//   while (count + updated < limit) {
//     const url = `${BASE_URL}${page}`;
//     console.log(`🔍 Scraping: ${url}`);
//     try {
//       const { data } = await axios.get(url, {
//         headers: { 'User-Agent': 'Mozilla/5.0' },
//         timeout: 5000000,
//       });
//       const $ = cheerio.load(data);
//       const productElements = $('.product').toArray();
//       if (productElements.length === 0) {
//         console.log('🚫 No products found. Ending scrape.');
//         break;
//       }
//       for (const el of productElements) {
//         if (count + updated >= limit) break;
//         const titleAnchor = $(el).find('.ht-product-title a');
//         const priceText = $(el).find('.price').first().text().trim();
//         if (!titleAnchor.length || !priceText) continue;
//         const name = titleAnchor.text().trim();
//         let link = titleAnchor.attr('href')?.trim() || '';
//         let image = $(el).find('img').attr('src') || '';
//         if (link.startsWith('/')) link = HOST + link;
//         if (image && !image.startsWith('http')) image = HOST + image;
//         const existing = await Product.findOneBy({ link });
//         if (existing) {
//           if (existing.price !== priceText || existing.name !== name) {
//             existing.name = name;
//             existing.price = priceText;
//             existing.image = image;
//             await existing.save();
//             console.log(`♻️ Updated: ${name}`);
//             updated++;
//           } else {
//             skipped++;
//           }
//         } else {
//           const product = Product.create({ name, price: priceText, image, link });
//           await product.save();
//           console.log(`✅ Saved: ${name}`);
//           count++;
//         }
//       }
//       page++;
//       await new Promise((res) => setTimeout(res, 1000)); // Delay to avoid rate limit
//     } catch (err: any) {
//       console.error(`❌ Error scraping page ${page}:`, err.message);
//       break;
//     }
//   }
//   console.log(`✅ Done. New: ${count}, Updated: ${updated}, Skipped: ${skipped}`);
//   return { new: count, updated, skipped };
// };
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio"));
const Product_1 = require("./entity/Product");
const BASE_URL = 'https://ethio.shop/shop/?eshop_product_tag=blouses&product-page=';
const HOST = 'https://ethio.shop';
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
async function fetchWithRetry(url, retries = 3) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const { data } = await axios_1.default.get(url, {
                headers: { 'User-Agent': 'Mozilla/5.0' },
                timeout: 30000, // 30 seconds
            });
            return data;
        }
        catch (err) {
            console.warn(`⚠️ Attempt ${attempt} failed for ${url}: ${err.message}`);
            if (attempt < retries)
                await sleep(attempt * 1000); // Exponential backoff
        }
    }
    console.error(`❌ All ${retries} attempts failed for ${url}`);
    return null;
}
const scrapeAndSaveProducts = async (limit = 1500) => {
    let page = 1;
    let count = 0;
    let updated = 0;
    let skipped = 0;
    while (count + updated < limit) {
        const url = `${BASE_URL}${page}`;
        console.log(`🔍 Scraping: ${url}`);
        const html = await fetchWithRetry(url);
        if (!html)
            break;
        const $ = cheerio.load(html);
        const productElements = $('.product').toArray();
        if (productElements.length === 0) {
            console.log('🚫 No products found. Stopping...');
            break;
        }
        for (const el of productElements) {
            if (count + updated >= limit)
                break;
            const titleAnchor = $(el).find('.ht-product-title a');
            const priceText = $(el).find('.price').first().text().trim();
            if (!titleAnchor.length || !priceText)
                continue;
            const name = titleAnchor.text().trim();
            let link = titleAnchor.attr('href')?.trim() || '';
            let image = $(el).find('img').attr('src') || '';
            if (link.startsWith('/'))
                link = HOST + link;
            if (image && !image.startsWith('http'))
                image = HOST + image;
            const existing = await Product_1.Product.findOneBy({ link });
            if (existing) {
                if (existing.price !== priceText || existing.name !== name) {
                    existing.name = name;
                    existing.price = priceText;
                    existing.image = image;
                    await existing.save();
                    console.log(`♻️ Updated: ${name}`);
                    updated++;
                }
                else {
                    skipped++;
                }
            }
            else {
                const product = Product_1.Product.create({ name, price: priceText, image, link });
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
exports.scrapeAndSaveProducts = scrapeAndSaveProducts;
