# Grade Project - Financial Application powered by AI

## Prerequisites

- Docker and Docker Compose installed on your machine
- Node.js (for local development)
- npm or yarn package manager

## Running the Application

### Using Docker (Recommended)

1. Install core API dependencies:
```bash
cd core-api
npm i
```

2. Generate prisma client:
```bash
npx prisma generate
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm i
```

4. Return to root directory and build/start all services:
```bash
cd ..
docker-compose up --build
```

This will start:
- PostgreSQL database
- Backend API server

### Running Locally

#### Core API Setup

1. Navigate to the core-api directory:
```bash
cd core-api
```

2. Install dependencies:
```bash
npm i
```

3. Start the development server:
```bash
npm run dev
```

#### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd ../frontend
```

2. Install dependencies:
```bash
npm i
```

3. Start the development server:
```bash
npm start
```

## Accessing the Application

- Backend API will be available at: `http://localhost:4000`
- Frontend application will be available at: `http://localhost:3000`

## Stopping the Application

To stop all services when running with Docker:
```bash
docker-compose down
```

To remove all data including the database volume:
```bash
docker-compose down -v
```

