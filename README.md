# mBookr
A meal booking web application that allows a user make meal orders. It also allows the food vendor manage meals, menus, orders and view revenue for the day.

[![Build Status](https://travis-ci.org/lateef-OG/mBookr.svg?branch=feature-integrate-travisCI)](https://travis-ci.org/lateef-OG/mBookr)
[![Coverage Status](https://coveralls.io/repos/github/lateef-OG/mBookr/badge.svg?branch=feature-integrate-coveralls)](https://coveralls.io/github/lateef-OG/mBookr?branch=feature-integrate-coveralls)
[![Test Coverage](https://api.codeclimate.com/v1/badges/92a9ea8557294e5b784a/test_coverage)](https://codeclimate.com/github/lateef-OG/mBookr/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/92a9ea8557294e5b784a/maintainability)](https://codeclimate.com/github/lateef-OG/mBookr/maintainability)

**UI template:** (https://lateef-og.github.io/mBookr/UI/)

##Built with
- [Node.js](https://nodejs.org/en/)
- [React](https://reactjs.org)
- [Express](https://expressjs.com)
- [PostgresSQL](https://postgresql.org)

## Endpoints
- GET **api/v1/meals/** List all meal options in the system
- POST **api/v1/meals/** Add a meal option to the list of meals
- PUT **api/vi/meals/:mealId** Update details of a meal option
- DELETE **api/v1/meals/:mealId** Delete a meal option from the list of meals
- GET **api/v1/menu/** Gets the menu available for the day
- POST **api/v1/menu/** Creates a menu for the day
- GET **api/v1/orders** List all orders in the system
- POST **api/v1/orders** Creates an order
- PUT **api/v1/orders/:orderId** Update details of an order

## Installation
1. Ensure you have Node.js and npm installed

2. Clone this repo
```bash
$ git clone https://github.com/lateef-OG/mBookr
```
3. Change directory to the Api folder and Install Dependencies
```bash
cd Api
npm install
```
4. Start the Application
```bash
npm start
```
5. View the Application in your browser on **localhost:4000**

## Authors
* **Lateef Ogunbadejo**
