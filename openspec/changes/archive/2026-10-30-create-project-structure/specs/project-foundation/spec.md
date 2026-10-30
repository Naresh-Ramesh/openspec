# Spec Delta

## Purpose

Provides the foundational full-stack workspace structure, runtime configuration, and development/testing environments for the Policy Management Dashboard.

## ADDED Requirements

### Requirement: Workspace Directory Separation and Execution Scripts
The project repository SHALL provide separated frontend and backend service directories with standardized scripts to run, build, and test both environments independently or concurrently.

#### Scenario: Running development servers
- **WHEN** a developer executes the root development script
- **THEN** both the frontend development server and the backend API service start and listen on their respective configured ports

#### Scenario: Running test suites
- **WHEN** a developer executes the test script
- **THEN** the test runners for both frontend and backend execute their test suites and report pass or fail status

### Requirement: Backend Service Health Endpoint
The backend service SHALL expose an HTTP REST health check endpoint at `/api/health` that reports operational status and server availability.

#### Scenario: Health endpoint check
- **WHEN** a client sends an HTTP GET request to `/api/health`
- **THEN** the backend responds with HTTP status 200 and a JSON payload containing `status: "ok"`

### Requirement: Local Database Initialization
The backend service SHALL automatically initialize a local SQLite database storage file on startup if it does not already exist, and establish a functional connection.

#### Scenario: Automatic database file initialization
- **WHEN** the backend service starts and no existing database file is detected at the configured location
- **THEN** the service creates the SQLite database file and establishes an active database connection without error

#### Scenario: Reconnecting to existing database
- **WHEN** the backend service starts with an existing SQLite database file
- **THEN** the service connects to the existing database file and preserves existing data

### Requirement: Frontend Application Routing Shell
The frontend service SHALL render a root application layout shell with client-side routing to support dashboard navigation.

#### Scenario: Accessing the root route
- **WHEN** a user navigates to the root URL `/`
- **THEN** the application displays the foundational dashboard layout and navigation shell

