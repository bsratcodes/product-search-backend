# 🛒 Ethio Shop Backend

A robust **Node.js** backend that scrapes real-time product data from major Ethiopian e-commerce platforms like **EthioShop**, **Jiji Ethiopia**, and **TeleGebeya**, and exposes the data via a clean, RESTful API.

Built to support the [Ethio Shop Frontend](https://github.com/bsratcodes/ethio-shop-frontend) with flexible product search and price comparison functionality.

---

## 🌐 API Base URL

```http
https://your-backend-url.com/api/products


📦 Features
-🧲 Real-time product scraping using Puppeteer

-🌍 Multi-source support: EthioShop, Jiji, TeleGebeya

-🔍 Search products by keyword

-📊 Paginated and limited results

-🧹 Auto-clean & deduplicated listings

-💾 Optional: Save to MySQL for caching / analytics

-⚙️Tech Stack
-Purpose	Tech
-Backend	Node.js, Express.js
-Scraping	Puppeteer (Headless Chrome)
-Database	MySQL + TypeORM (optional)
-Caching	Redis (optional)
-Deployment	Railway, Vercel Functions, or Render

📁 Folder Structure
 ethio-shop-backend/
├── src/
│   ├── scrapers/        # Scraper logic per source (EthioShop, Jiji, TeleGebeya)
│   ├── services/        # Core business logic
│   ├── controllers/     # Route handling
│   ├── routes/          # API route definitions
│   ├── db/              # Optional: TypeORM config + models
│   ├── utils/           # Shared helper functions
│   └── index.js         # Server entry point
├── .env                # Environment variables
├── package.json
└── README.md

🚀 Getting Started
1. Clone the repo
git clone https://github.com/bsratcodes/ethio-shop-backend.git
cd ethio-shop-backend

2. Install dependencies
   npm install
3. Configure environment variables
 creat .env file at the root of your project
PORT=3000
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=yourpass
MYSQL_DB=ethioshop

4. Start the server
 npm run dev
server will run on port http://localhost:3000

🔌 API Endpoints
Method	Route	Description
GET	/api/products	Returns all scraped products
GET	/api/products?search=phone	Search for products matching query
GET	/api/products?limit=10	Limit number of results
POST	/scrape	(Optional) Trigger manual scraping

🛠️ Future Improvements
✅ Source toggling (e.g., filter by vendor)

🧠 NLP-powered smart search

📉 Price history tracking

📂 Export CSV / JSON

🐳 Dockerized deployment

☁️ CI/CD via GitHub Actions


🙋‍♂️ Author
Bsrat Wellerufael
📧 Email: bsratwellerufael2024@gmail.com
🔗 LinkedIn: linkedin.com/in/bsrat-wellerufael-91524529b

⭐ Support This Project
If you found this useful, please ⭐ it on GitHub, share it with developers in Ethiopia and beyond, or contribute a PR to make it better.

“Bringing digital price transparency to Ethiopian consumers, one scrape at a time.”
