# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod, `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (ESM bundle)
- **Frontend**: React + Vite + Tailwind CSS v4 + Wouter + React Query

## Project: WebsiteUpTest

A website availability checker that tests URLs and IP addresses from 5 independent global locations (New York, London, Singapore, Sydney, Sao Paulo).

### Features
- Check any website URL or IP address for availability
- 5-location parallel checks with response times and HTTP status codes
- 25 recently checked websites (auto-refreshes every 10s)
- SEO landing pages at `/is-[website]-down` for popular sites
- sitemap.xml with 20 popular website pages
- FAQ, About, Privacy Policy, Terms of Use pages
- Contact: contact@websiteuptest.com

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   ├── api-server/         # Express API server
│   └── websiteuptest/      # React + Vite frontend (WebsiteUpTest)
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── tsconfig.json
└── package.json
```

## Routes

### Frontend (websiteuptest)
- `/` — Home page with URL checker and recently checked sites
- `/is-[website]-down` — Website-specific status pages (e.g. /is-google-down)
- `/about` — About page
- `/faq` — FAQ page
- `/privacy-policy` — Privacy Policy
- `/terms-of-use` — Terms of Use
- `/sitemap.xml` — Sitemap with 20 popular website pages

### API (api-server)
- `POST /api/check` — Check a URL/IP from 5 global locations
- `GET /api/recent` — Get 25 most recently checked websites
- `GET /api/healthz` — Health check

## Database Schema

### `checks` table
- `id` — Primary key
- `target` — URL or IP that was checked
- `is_up` — Boolean status
- `avg_response_time` — Average response time in ms
- `checked_at` — Timestamp

### `location_results` table
- `id` — Primary key
- `check_id` — FK to checks
- `location` — Location name
- `status` — 'up', 'down', or 'timeout'
- `response_time` — Response time in ms
- `status_code` — HTTP status code (if available)

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references.

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references

## Packages

### `artifacts/api-server` (`@workspace/api-server`)

Express 5 API server. Routes live in `src/routes/`.

### `artifacts/websiteuptest` (`@workspace/websiteuptest`)

React + Vite frontend. Routes handled by wouter. Uses CatchAllRoute pattern for `/is-*-down` routes due to regexparam v3 limitations with hyphenated params.

### `lib/db` (`@workspace/db`)

Database layer using Drizzle ORM with PostgreSQL.

### `lib/api-spec` (`@workspace/api-spec`)

OpenAPI spec and Orval codegen config.
