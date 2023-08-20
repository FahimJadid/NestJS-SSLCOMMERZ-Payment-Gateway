# SSLCommerz Payment API Using NESTJS

Welcome to the SSLCommerz Payment API documentation. This API integrates with the SSLCommerz payment gateway to facilitate online payments for your application.

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Response Format](#response-format)
- [License](#license)

## Introduction

This API provides endpoints for initiating payments, validating payments, and handling payment notifications. It is built using NestJS and integrates with the SSLCommerz payment gateway to manage payment transactions.

## Prerequisites

Before you begin, make sure you have the following installed:

- Node.js and npm
- NestJS CLI
- Git

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com:FahimJadid/NestJS-SSLCOMMERZ-Payment-Gateway.git
   ```
2. Navigate to the project directory:

   ```bash
   cd sslcommerz-payment-api
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

## Configuration

1. Create a `.env` file in the root directory and configure the following environment variables:

   ```env

   DB_USER=
   DB_PASSWORD=
   DB_HOST=
   DB_PORT=27017
   DB_NAME=payment-gateway

   NODE_ENV=DEV
   PROD=false

   STORE_ID=your_store_id
   STORE_PASSWORD=your_store_password
   IS_LIVE=false


   ROOT=http://localhost:3000  # Replace with your server root URL
   JWT_SECRET=E6wv#P9b@R2mGqZ5

   ```

## Usage

To start the API server, run the following command:

```bash
npm run start
```

The API will be accessible at `http://localhost:5000`.

## Endpoints

- `GET /` - Welcome message and API root URL.
- `GET /ssl-request` - Initiate a payment transaction.
- `GET /validate` - Validate a payment transaction.
- `POST /ssl-payment-notification` - Handle payment notifications.
- `POST /ssl-payment-success` - Handle successful payment.
- `POST /ssl-payment-fail` - Handle failed payment.
- `POST /ssl-payment-cancel` - Handle canceled payment.
- `POST /ssl-payment-ipn` - Validate payment through IPN.

## Response Format

The API responses are structured using DTOs (Data Transfer Objects) to ensure a consistent and organized format. The response format includes two main properties:

- `data`: Contains the data specific to the response.
- `message`: A descriptive message about the response outcome.

For detailed response formats, refer to the respective endpoint sections in this README.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```
