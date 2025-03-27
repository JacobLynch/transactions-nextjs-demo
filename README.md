## Dependencies
- Docker
- Node 18+
- NPM

## Getting Started

### Local Development Setup

Before running the development server, you need to set up the local database:

1. Make sure you have Docker installed on your machine
2. Run the following command to set up everything in one go:

```bash
npm run setup
```

This command will:
- Start the PostgreSQL database in a Docker container
- Install node dependencies
- Generate Prisma client
- Apply all database migrations

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing

You can run tests with either

```bash
npm run test
```

Or with

```bash
npm run cypress:open
```