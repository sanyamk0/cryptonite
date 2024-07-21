## Cryptonite - Groww Frontend Intern Assignment

#### Welcome to our GitHub repository! This project provides access to various cryptocurrencies.

## Homepage (/)

Global Market Gap and Public Company Holdings

## Explore (/explore)

To explore the data, visit the /explore endpoint. Here, you can view 20 coins at a time, with the ability to paginate through additional sets of 20 coins.

## Coin Details (/coin/:id) For eg. /coin/bitcoin

For detailed information on a specific coin, visit /coin/:id. This endpoint provides basic data about the coin along with a chart displaying its performance.

## Running Locally

To run this project locally, follow these steps:

1. Clone the repository to your local machine:

```bash
git clone https://github.com/sanyamk0/cryptonite.git
cd cryptonite
```

2. install dependencies using npm:

```bash
npm install
```

3. Create a .env file in the root directory of the project and add the following keys:

```bash
NEXT_PUBLIC_COINGECKO_API_KEY=your_coin_gecko_api_key
NEXT_PUBLIC_CRYPTOCOMPARE_API_KEY=your_crypto_compare_api_key
```

Replace your_coin_gecko_api_key and your_crypto_compare_api_key with your respective API keys.

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and navigate to http://localhost:3000 to view the application.
