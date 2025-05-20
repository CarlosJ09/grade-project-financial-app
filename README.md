# Grade Project - Financial Application powered by AI

## Prerequisites

- Docker and Docker Compose installed on your machine
- Node.js (for local development)
- npm or yarn package manager

## Environment Setup

1. Create a `.env` file in the root directory with the following variables:
```env
POSTGRES_USER=your_db_user
POSTGRES_PASSWORD=your_db_password
POSTGRES_DB=financial_app
POSTGRES_PORT=5432
DATABASE_URL=postgresql://your_db_user:your_db_password@db:5432/financial_app
BACKEND_PORT=4000
JWT_SECRET=your_jwt_secret
```

## Running the Application

### Using Docker (Recommended)

1. Install backend dependencies:
```bash
cd backend
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

#### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
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

