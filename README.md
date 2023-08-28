# Crypto React application on web client

Crypto React application with Typesscript using [Coingecko API](https://api.coingecko.com/api/v3/)

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Features

- Bitcoin infos with charts for different periods.
- Search crypto with debounce and pagination.
- Crypto details page.
- Winners and loosers depending on the period.
- Add crypto to favorites and delete crypto from favorites.

## Try it out

https://crypto-app-omega-ashen.vercel.app/

**Warning:** Coingecko public api has a rate limit of 10-30 calls per minute, if you exceed that limit you will be blocked until the next 1 minute window.

## How to Run locally

```bash
$ git clone https://github.com/Mathieu94110/CryptoApp.git
$ cd CryptoApp
$ npm start
```

No variables on .env file are required !

just visit http://localhost:3000.

## Screenshots Desktops

![home](src/assets/images/crypto-home-screen.PNG?raw=true "Home")
![search](src/assets/images/crypto-search-screen.PNG?raw=true "Search")
![winners and loosers](src/assets/images/crypto-winners-and-loosers-screen.PNG?raw=true "WinnersAndLoosers")
![favorites](src/assets/images/crypto-favorites-screen.PNG?raw=true "Favorites")

## Screenshots Mobiles

![home](src/assets/images/crypto-home-screen-mobiles.PNG?raw=true "Home")
![search](src/assets/images/crypto-search-screen-mobiles.PNG?raw=true "Search")
![winners and loosers](src/assets/images/crypto-winners-and-loosers-screen-mobiles.PNG?raw=true "WinnersAndLoosers")
![favorites](src/assets/images/crypto-favorites-screen-mobiles.PNG?raw=true "Favorites")
