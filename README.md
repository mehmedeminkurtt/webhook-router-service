# Webhook Router Service

This is a small Node.js service I built to receive webhook requests and forward them to different services based on simple routing rules (for example, product title or ID).

## What it does
- Receives webhook POST requests
- Forwards requests to different services based on conditions
- Basic request validation
- Simple logging and error handling

## Tech Stack
- Node.js
- Express
- Axios

## How to run
1. Install dependencies:
   npm install

2. Start the server:
   npm start

## Endpoint
POST /webhook

## Notes
- Routing rules in this project are examples and can be changed.
- No secrets, tokens or real customer data are included.
