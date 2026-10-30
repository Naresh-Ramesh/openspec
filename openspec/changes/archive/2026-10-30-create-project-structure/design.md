# Design

## Context

See `proposal.md` for motivation. The project is a Policy Management Dashboard designed according to the architecture specifications in `openspec/config.yaml`. The repository currently contains only OpenSpec configuration. This design establishes the directory layout, technology selections, runtime integration, and development workflow.

## Goals / Non-Goals

**Goals:**
- Provide a clean, maintainable two-tier directory layout: `client/` for frontend and `server/` for backend.
- Configure root orchestration scripts to install dependencies, run development servers concurrently, and execute test suites across both tiers.
- Setup frontend scaffolding using React, Vite, and React Router with Vitest and React Testing Library.
- Setup backend scaffolding using Node.js, Express, and a lightweight SQLite client with the Node.js native test runner and Supertest.
- Establish an automated local SQLite file initialization and connectivity mechanism on backend startup.
- Implement an operational health check endpoint (`GET /api/health`).

**Non-Goals:**
- Implementing business logic (e.g., policy CRUD, policy claims, user management) — these belong in separate OpenSpec feature changes.
- Implementing full authentication flows (login, register, session store backends) — foundation will configure baseline cookie/session middleware readiness, while authentication specifications belong in a dedicated change.
- Deploying to production environments or setting up CI/CD pipelines in this change.

## Decisions

### 1. Workspace Organization: Root npm Scripts with Subdirectory Packages
- **Choice**: Multi-package directory layout with a root `package.json` utilizing npm scripts and `concurrently` to run both services.
- **Alternatives Considered**:
  - *Full monorepo tool (Turborepo / Nx)*: Excessive complexity for a single frontend and backend application.
  - *Completely decoupled independent repositories*: Hinders synchronized local development and shared OpenSpec planning.
- **Rationale**: Keeps each tier self-contained with its own `package.json`, while root scripts provide simple one-command developer ergonomics.

### 2. Frontend Toolchain: Vite + React + React Router
- **Choice**: Vite for fast HMR and bundling; React 18+ with JSX; `react-router-dom` for client routing; Vitest + `@testing-library/react` + `jsdom` for testing.
- **Alternatives Considered**:
  - *Create React App / Webpack*: Slower build times and largely deprecated tooling.
  - *Next.js*: Project context specifies a dedicated Express REST API backend and React with Vite frontend.
- **Rationale**: Direct alignment with `config.yaml` constraints and modern frontend developer experience.

### 3. Backend Toolchain: Express + Node.js Native Test Runner + Supertest
- **Choice**: Express.js with JSON body parser, `cookie-parser`, and CORS middleware. Uses Node.js native test runner (`node:test`, `node:assert`) and `supertest` for API integration testing.
- **Alternatives Considered**:
  - *Jest / Mocha*: Extra dependencies; Node.js built-in test runner provides zero-dependency fast test execution compatible with Supertest.
- **Rationale**: Lightweight, stable, and fulfills all backend testing requirements in `config.yaml`.

### 4. Database Setup: SQLite with Automatic Directory/File Initialization
- **Choice**: SQLite using `better-sqlite3` (synchronous, high-performance C++ binding) or `sqlite3`, with database file stored in `server/data/policy.db`. The server will ensure `server/data/` exists and opens the file on startup.
- **Alternatives Considered**:
  - *Client-server SQL (PostgreSQL / MySQL)*: Overhead of external services not suitable for local lightweight dashboard requirements.
  - *In-memory SQLite*: Data would not persist across server restarts.
- **Rationale**: Matches the lightweight database requirement while ensuring reliable local data persistence.

## Risks / Trade-offs

- **[Risk]** Native binary compilation for `better-sqlite3` on differing OS platforms (e.g., Windows vs Linux).  
  → **Mitigation**: Specify compatible Node.js LTS version and provide clear fallback or prebuilt binary support; configure `.gitignore` to prevent committing compiled binaries or database files.
- **[Risk]** Port collisions during local concurrent development (e.g., port 3000 / 5173).  
  → **Mitigation**: Configure frontend dev server proxy (Vite `server.proxy`) and backend default port (e.g., `PORT=5000`) with environment variable overrides.
- **[Risk]** Accidental generation of application source code before tasks apply phase.  
  → **Mitigation**: Respect OpenSpec planning boundaries; this document only outlines architectural decisions and directory layout.

