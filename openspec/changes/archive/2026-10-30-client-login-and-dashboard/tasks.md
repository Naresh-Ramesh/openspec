# Tasks

## 1. Client Tailwind CSS Setup and Utility Configuration

- [x] 1.1 Install and configure Tailwind CSS and PostCSS in `client/`, import Tailwind directives in `client/src/index.css`, and verify utility classes compile during `npm run build --workspace=client`.

## 2. Client Authentication State and Route Protection

- [x] 2.1 Implement `AuthContext` in `client/src/context/AuthContext.jsx` with default user profile, login, updateProfile, and logout methods with `localStorage` sync, and verify with unit tests in `client/src/context/AuthContext.test.jsx`.
- [x] 2.2 Implement `ProtectedRoute` component in `client/src/components/ProtectedRoute.jsx` and configure routing in `client/src/App.jsx` with routes for `/login` and protected `/`, and verify route redirection tests pass.

## 3. Login Interface Implementation

- [x] 3.1 Build the `LoginPage` component in `client/src/pages/LoginPage.jsx` with responsive card layout, form inputs, validation, and demo credential autofill following `wireframe-to-react` standards, and verify component renders and submits correctly in `client/src/pages/LoginPage.test.jsx`.

## 4. Policy Dashboard and User Profile View & Edit

- [x] 4.1 Build `UserProfileCard` component in `client/src/components/UserProfileCard.jsx` displaying user details (name, email, role, department, phone, policies count) and edit toggle button, and verify display tests pass in `client/src/components/UserProfileCard.test.jsx`.
- [x] 4.2 Build `ProfileEditForm` component in `client/src/components/ProfileEditForm.jsx` supporting field editing, validation errors, cancel reversion, and save updates, and verify editing and validation unit tests pass.
- [x] 4.3 Integrate `UserProfileCard`, `ProfileEditForm`, and Policy overview summary cards into `client/src/pages/Dashboard.jsx` with responsive Tailwind grid layout and logout header action, and verify integration tests pass in `client/src/pages/Dashboard.test.jsx`.

## 5. End-to-End Client Test Suite Verification

- [x] 5.1 Run `npm run test --workspace=client` and verify all client test suites pass with zero failures.
- [x] 5.2 Run `npm run build --workspace=client` and verify clean production asset bundle compilation.

## Workflow follow-up

- Validate the OpenSpec change status and specs.
- Run `/opsx-apply client-login-and-dashboard` upon review approval.

