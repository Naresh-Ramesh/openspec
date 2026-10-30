# Proposal

## Why

The Policy Management Dashboard currently has an initialized OpenSpec configuration and architectural baseline defined in `config.yaml`, but lacks the physical project directory structure, package configuration, and baseline runtime setup. Establishing a standardized full-stack project structure now ensures consistent development, clean separation between frontend and backend services, and a solid foundation for upcoming feature-specific changes.

## What Changes

- Establish a modular full-stack workspace containing dedicated frontend (`client/`) and backend (`server/`) service directories.
- Configure frontend directory layout using React, Vite, and React Router with Vitest and React Testing Library setup.
- Configure backend directory layout using Node.js, Express, and a lightweight SQLite database client with Node.js test runner and Supertest setup.
- Define root and service-level package management scripts for installing dependencies, running local development servers concurrently, executing builds, and running test suites.
- Provide baseline environment configuration templates and server health check capabilities.

## Capabilities

### New Capabilities
- `project-foundation`: Foundational workspace layout, directory organization, environment configuration, database connection scaffolding, and execution scripts for the Policy Management Dashboard.

### Modified Capabilities
None.

## Impact

- **Filesystem & Workspace**: Creates root workspace configuration along with `client/` and `server/` trees.
- **Dependencies**: Introduces frontend dependencies (React, React DOM, React Router, Vite, Vitest) and backend dependencies (Express, SQLite driver, Supertest).
- **Tooling & Workflows**: Establishes unified CLI commands for `npm run dev`, `npm run build`, and `npm test`.

