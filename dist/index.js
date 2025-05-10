"use strict";
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
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const typeorm_1 = require("typeorm");
const dotenv = __importStar(require("dotenv"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const Product_1 = require("./entity/Product");
const node_cron_1 = __importDefault(require("node-cron"));
// import { scrapeAndSaveProducts } from './scraper';
const scrape_1 = require("./scrape");
dotenv.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(productRoutes_1.default);
const AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    entities: [Product_1.Product],
});
AppDataSource.initialize()
    .then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`🚀 Server running on port ${process.env.PORT || 3000}`);
    });
})
    .catch((err) => console.error('DB connection error:', err));
node_cron_1.default.schedule('0 */6 * * *', async () => {
    console.log('🕒 Running scheduled scraper...');
    await (0, scrape_1.scrapeAndSaveProducts)();
});
