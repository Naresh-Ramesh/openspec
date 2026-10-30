# Tasks

## 1. Workspace Scaffolding and Root Configuration

- [x] 1.1 Create root `.gitignore`, `.editorconfig`, and root `package.json` with scripts (`dev`, `build`, `test`, `lint`) orchestrating client and server workspaces, and verify by running `npm run` to view listed scripts.
- [x] 1.2 Setup development orchestration dependency (`concurrently`) in root dependencies, and verify package installation completes cleanly.

## 2. Backend Scaffolding and Database Foundation

- [x] 2.1 Initialize `server/` directory with `package.json` specifying Express, SQLite driver, `cookie-parser`, `cors`, and `dotenv`, and verify dependencies install cleanly.
- [x] 2.2 Implement backend server entry point with middleware, environment configuration, and `GET /api/health` endpoint, and verify by starting the server and checking health response status 200.
- [x] 2.3 Implement SQLite database connection module with automated directory and file initialization on startup, and verify database file creation and connection test.
- [x] 2.4 Setup backend test suite with Node.js test runner and Supertest in `server/tests/health.test.js`, and verify `npm test` passes in `server/`.

## 3. Frontend Scaffolding and Routing Foundation

- [x] 3.1 Initialize `client/` directory with Vite, React, and JavaScript layout (`index.html`, `vite.config.js`, `package.json`), and verify `npm run build` generates production assets without errors.
- [x] 3.2 Configure frontend routing using React Router with root layout navigation, and verify client dev server renders the root dashboard shell.
- [x] 3.3 Setup frontend testing harness with Vitest, React Testing Library, and jsdom, and verify `npm test` passes in `client/`.

## 4. End-to-End Workspace Integration Verification

- [x] 4.1 Run root `npm run dev`, and verify both client and server development processes launch concurrently without port conflicts.
- [x] 4.2 Run root `npm test`, and verify both client Vitest tests and server Node test suites execute and report zero failures.

## Workflow follow-up

- Validate the OpenSpec change status and specs.
- Archive the change after implementation review.

