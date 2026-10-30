# Design

## Context

See `proposal.md` for motivation. The Policy Management Dashboard has a functioning frontend structure (`client/`) powered by React 18, Vite, and React Router. Per user constraints, this change is strictly confined to the `client/` frontend — the server code, database, and backend endpoints will not be modified. Frontend styling and visual hierarchy will follow the `wireframe-to-react` standards using Tailwind CSS.

## Goals / Non-Goals

**Goals:**
- Provide a clean, modern, accessible Login interface (`/login`) styled with Tailwind CSS utilities.
- Implement an `AuthContext` to manage client-side authentication status, current user profile, login, and logout.
- Provide a `ProtectedRoute` wrapper guarding the dashboard route (`/`) against unauthenticated access.
- Build an interactive Policy Dashboard containing policy summary metric cards and a dedicated User Profile module.
- Enable viewing and editing user details (Name, Email, Role, Department, Phone) with field validation, save feedback, and cancel reversion.
- Configure Tailwind CSS in the `client/` workspace for streamlined styling.

**Non-Goals:**
- Modifying backend server code, Express routes, or SQLite database tables (strictly client-only).
- Integrating external OAuth/SSO identity providers.
- Persisting updates to a remote database (state will be maintained within React state and synchronized with client-side browser storage).

## Decisions

### 1. Client-Side Authentication State (`AuthContext`)
- **Choice**: React Context API (`AuthContext` & `useAuth` hook) backed by `localStorage` persistence.
- **Alternatives Considered**:
  - *Full server session cookie*: Violates the strict client-only requirement.
  - *Redux Toolkit / Zustand*: Adds unnecessary bundle weight for a single auth and profile state.
- **Rationale**: React Context is built-in, lightweight, and cleanly decouples auth state from individual UI components.

### 2. Styling Architecture: Tailwind CSS
- **Choice**: Tailwind CSS v3/v4 configured in `client/` with PostCSS or Vite plugin.
- **Alternatives Considered**:
  - *Inline CSS styles*: Difficult to maintain responsive variants and focus states.
  - *Heavy UI library (MUI / Ant Design)*: Violates `wireframe-to-react` guidelines and introduces bloated DOM.
- **Rationale**: Direct alignment with `wireframe-to-react` guidelines for responsive utilities, accessible form controls, and crisp design hierarchy.

### 3. Component Hierarchy
- **`App`**: Router configuration with `/login` and protected `/` dashboard route.
- **`AuthContext` (`client/src/context/AuthContext.jsx`)**: Supplies `user`, `login(email, password)`, `updateProfile(newDetails)`, `logout()`.
- **`ProtectedRoute` (`client/src/components/ProtectedRoute.jsx`)**: Checks `isAuthenticated`; redirects unauthenticated requests to `/login`.
- **`LoginPage` (`client/src/pages/LoginPage.jsx`)**: Clean responsive card with email/password inputs, validation messaging, demo account quick-fill, and submit loading state.
- **`DashboardPage` (`client/src/pages/Dashboard.jsx`)**: Contains app navigation header, policy metrics overview, and user profile management section.
- **`UserProfileCard` (`client/src/components/UserProfileCard.jsx`)**: Displays avatar/initials, contact details, role badge, policy count, and toggles edit mode.
- **`EditProfileModal` / `ProfileEditForm` (`client/src/components/ProfileEditForm.jsx`)**: Input form for editing name, email, department, and phone with instant validation and cancel/save controls.

## Risks / Trade-offs

- **[Risk]** Data changes made in client profile editing are lost upon browser cache clear.  
  → **Mitigation**: Persist user profile state in `localStorage` so edits survive page refreshes, and provide a "Reset to Defaults" action.
- **[Risk]** Unprotected dashboard access via direct URL manipulation.  
  → **Mitigation**: Route-level guarding via `ProtectedRoute` ensures immediate redirection to `/login` if auth state is unverified.
- **[Risk]** Inconsistent form input focus or accessibility barriers.  
  → **Mitigation**: Adhere to `wireframe-to-react` accessibility practices with explicit HTML labels, `aria-invalid` attributes, visible focus rings, and keyboard navigation support.

