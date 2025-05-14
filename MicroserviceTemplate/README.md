 simple Node.js microservice template using Express and OpenAPI/Swagger that connects to a shared database.

## Features

- Express.js web server
- OpenAPI/Swagger documentation
- Shared PostgreSQL database support
- Error handling middleware
- Request logging
- Health check endpoint
- Configuration management
- Docker support
- Development tools (linting, testing)

## Requirements

- Node.js 14.x or higher
- PostgreSQL database (shared across microservices)

## Getting Started

1. Clone this repository
2. Create a `.env` file based on `.env.example`
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm run dev
   ```

## API Documentation

Once the server is running, access the OpenAPI documentation at:
http://localhost:3000/api-docs

## Available Scripts

- `npm start` - Start the server in production mode
- `npm run dev` - Start the server in development mode with hot reload
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## Directory Structure

- `/src` - Source code
  - `/api` - API-related code
    - `/controllers` - Request handlers
    - `/middlewares` - Express middlewares
    - `/routes` - API routes
    - `/swagger` - OpenAPI specification
  - `/config` - Application configuration
  - `/db` - Database connection and queries
  - `/services` - Business logic