# WorkHub Operations Portal

## README Requirement Coverage

The README covers all sections required by the WorkHub Project-Readiness Diagnostic Assessment.

| Section | Required Content |
|---|---|
| **Overview** | Business purpose and major capabilities |
| **Technology** | Stack and why major libraries were selected |
| **Prerequisites** | Node.js and package-manager expectations |
| **Setup** | Clean install, environment copy, dev command, type-check, lint, build, preview |
| **Demo credentials** | The three public DummyJSON role accounts |
| **Routes and permissions** | Route map and role/permission table |
| **Architecture** | Data flow, folder structure, state ownership, service/query/mapper boundaries |
| **API endpoints** | Authentication, users, and todos/work items used by the application |
| **Environment** | All variables and mode behavior; frontend variables are public |
| **Known limitations** | DummyJSON simulated writes, hard-refresh reset, auth-demo limitations, and excluded automated testing |
| **Manual verification** | Commands and acceptance scenarios verified |
| **AI disclosure** | What assistance was used and how ownership was validated |

---

## 1. Overview

WorkHub Operations Portal is an enterprise-style React + TypeScript
application for managing users and work items in an internal operations
environment.

The application demonstrates:

-   Role-aware authentication and authorization
-   Protected and nested routes
-   User directory and user CRUD workflows
-   Work-item management
-   Dashboard statistics and recent work
-   URL-driven search, filtering, sorting, pagination, and page size
-   React Hook Form + Zod validation
-   TanStack Query server-state management and caching
-   Zustand for authentication and UI preferences
-   DTO → mapper → UI-model data boundaries
-   Loading, error, empty, success, forbidden, and not-found states
-   Responsive layout and accessibility-oriented shared components

The project follows the WorkHub Project-Readiness Diagnostic Assessment
requirements. The assessment expects a strongly typed, buildable,
lint-clean, reviewable application with clear ownership of server state,
client state, URL state, and form state.

------------------------------------------------------------------------

## 2. Business Purpose

WorkHub provides one place for operations staff to understand:

-   who is available,
-   what work is assigned,
-   who owns each work item,
-   whether work is complete,
-   and which actions are allowed for the current role.

The application intentionally uses DummyJSON as a
development/prototyping backend. DummyJSON mutations are simulated and
are not persistent production writes.

------------------------------------------------------------------------

## 3. Technology Stack

  Area            Technology
  --------------- ---------------------------------------------
  UI              React 19 + TypeScript
  Build tool      Vite
  Routing         React Router
  Server state    TanStack React Query
  HTTP            Axios
  Forms           React Hook Form + Zod
  Client state    Zustand
  Styling         Tailwind CSS
  Notifications   React Hot Toast
  Validation      Zod
  Quality         ESLint + TypeScript + Vite production build

### Why these technologies

-   **React + TypeScript** provide component-based UI development with
    strict compile-time type safety.
-   **React Router** provides nested layouts, protected routes, route
    parameters, query strings, and authorization boundaries.
-   **TanStack Query** owns remote/server state, including loading,
    error, caching, refetching, and mutation lifecycle.
-   **Zustand** is intentionally limited to authentication/session
    information and UI preferences.
-   **React Hook Form + Zod** provide typed form state and runtime
    validation.
-   **Axios** is isolated behind a centralized API client/service layer
    instead of being called directly from pages.
-   **Tailwind CSS** provides consistent responsive styling without a
    heavy enterprise component suite.

The assessment requires clear separation between server state, client
state, URL state, and form state.

------------------------------------------------------------------------

## 4. Prerequisites

Recommended environment:

-   Node.js 20+ LTS
-   npm 10+
-   Git

Verify:

``` bash
node --version
npm --version
git --version
```

------------------------------------------------------------------------

## 5. Installation

Clone the repository and install dependencies:

``` bash
npm install
```

For a clean CI-style installation when the lockfile is committed:

``` bash
npm ci
```

Create the local environment file:

``` bash
cp .env.example .env
```

On Windows PowerShell:

``` powershell
Copy-Item .env.example .env
```

------------------------------------------------------------------------

## 6. Environment Configuration

### `.env.example`

``` env
VITE_API_BASE_URL=https://dummyjson.com
VITE_API_DELAY_MS=800
VITE_APP_NAME=WorkHub
```

### Development

``` env
VITE_API_BASE_URL=https://dummyjson.com
VITE_API_DELAY_MS=800
```

### Production

``` env
VITE_API_BASE_URL=https://dummyjson.com
VITE_API_DELAY_MS=0
```

Frontend environment variables are public at build time. They must not
contain secrets.

The API base URL is centralized in:

``` text
src/api/config.ts
```

and is not hard-coded inside feature pages or services.

------------------------------------------------------------------------

## 7. Available Commands

Start development:

``` bash
npm run dev
```

Type-check:

``` bash
npm run type-check
```

Lint:

``` bash
npm run lint
```

Production build:

``` bash
npm run build
```

Preview the production build:

``` bash
npm run preview
```

Recommended final quality gate:

``` bash
npm ci
npm run type-check
npm run lint
npm run build
```

------------------------------------------------------------------------

## 8. Demo Accounts

These are public DummyJSON placeholder accounts provided by the
assessment.

  -----------------------------------------------------------------------
  Application Role  Username          Password          Expected Access
  ----------------- ----------------- ----------------- -----------------
  Administrator     `emilys`          `emilyspass`      Full application
                                                        access

  Manager           `oliviaw`         `oliviawpass`     Dashboard, users
                                                        read access, work
                                                        items, profile,
                                                        settings

  Contributor       `averyp`          `averyppass`      Dashboard, own
                                                        work items,
                                                        profile, settings
  -----------------------------------------------------------------------

These are assessment/demo credentials only. They must never be reused as
real credentials.

Sensitive DummyJSON fields are not displayed in the UI.

------------------------------------------------------------------------

## 9. Roles and Permissions

DummyJSON roles are mapped to application roles:

  DummyJSON Role   Application Label
  ---------------- -------------------
  `admin`          Administrator
  `moderator`      Manager
  `user`           Contributor

Authorization is centralized in:

``` text
src/config/permissions.ts
src/config/role-permissions.ts
src/router/PermissionGuard.tsx
```

The UI uses the same permission model for:

-   route protection,
-   navigation visibility,
-   create/edit/delete actions,
-   work-item ownership restrictions.

### Administrator

-   Dashboard
-   Users: read/create/update/delete
-   Work Items: read/create/update/delete
-   Profile
-   Settings

### Manager

-   Dashboard
-   Users: read-only
-   Work Items: read/create/update
-   Profile
-   Settings

### Contributor

-   Dashboard
-   Own work items
-   Create/update permitted work items according to ownership rules
-   Profile
-   Settings
-   No user directory access

------------------------------------------------------------------------

## 10. Route Map

### Public

  Route      Purpose
  ---------- ----------------
  `/login`   Authentication

### Protected

  Route                        Purpose
  ---------------------------- --------------------------------
  `/app`                       Protected application boundary
  `/app/dashboard`             Dashboard
  `/app/users`                 User directory
  `/app/users/:userId`         User details
  `/app/users/new`             Create user
  `/app/users/:userId/edit`    Edit user
  `/app/work-items`            Work items
  `/app/work-items/new`        Create work item
  `/app/work-items/:id/edit`   Edit work item
  `/app/profile`               Current-user profile
  `/app/settings`              UI preferences

### Error routes

  Route          Purpose
  -------------- ------------------------
  `/forbidden`   403 permission failure
  `/not-found`   404 route failure

Unknown routes are redirected to the not-found page by the router
catch-all.

------------------------------------------------------------------------

## 11. Architecture

The application follows feature-based architecture with shared
infrastructure.

``` text
src/
├── api/
│   ├── client.ts
│   ├── config.ts
│   ├── endpoints.ts
│   ├── errors.ts
│   ├── interceptors.ts
│   ├── queryKeys.ts
│   ├── response.ts
│   └── index.ts
│
├── app/
│   └── App.tsx
│
├── config/
│   ├── navigation.ts
│   ├── permissions.ts
│   ├── role-permissions.ts
│   └── roles.ts
│
├── features/
│   ├── auth/
│   ├── dashboard/
│   ├── profile/
│   ├── settings/
│   ├── users/
│   └── work-items/
│
├── layouts/
│   ├── AppLayout.tsx
│   ├── AuthLayout.tsx
│   ├── Header.tsx
│   └── Sidebar.tsx
│
├── providers/
│   ├── QueryProvider.tsx
│   ├── ThemeProvider.tsx
│   └── queryClient.ts
│
├── router/
│   ├── AppRouter.tsx
│   ├── PermissionGuard.tsx
│   ├── ProtectedRoute.tsx
│   ├── lazy.ts
│   ├── route.config.ts
│   ├── routes.tsx
│   └── types.ts
│
├── shared/
│   ├── components/
│   ├── constants/
│   ├── lib/
│   ├── pages/
│   └── utils/
│
└── stores/
    ├── auth.store.ts
    └── preferences.store.ts
```

### Feature boundary pattern

Each major feature follows a similar separation:

``` text
feature/
├── api/
├── components/
├── dto/
├── hooks/
├── mappers/
├── models/
├── pages/
├── schemas/
├── services/
└── types/
```

This keeps API contracts, domain/UI models, business logic, and
presentation concerns separate.

------------------------------------------------------------------------

## 12. Data Flow

The main server-data flow is:

``` text
Component/Page
      ↓
Custom Query/Mutation Hook
      ↓
Feature Service
      ↓
Feature API
      ↓
Central Axios Client
      ↓
DummyJSON
```

For response data:

``` text
DummyJSON Response DTO
        ↓
Mapper
        ↓
Application Model
        ↓
UI
```

Pages do not call Axios directly.

------------------------------------------------------------------------

## 13. DTO and Mapper Strategy

External API responses are represented using DTOs.

Examples:

``` text
features/users/dto/
features/work-items/dto/
features/auth/dto/
```

The mapper boundary protects the UI from the raw DummyJSON response
shape.

Examples:

``` text
features/users/mappers/user.mapper.ts
features/work-items/mappers/work-item.mapper.ts
features/auth/mapper/auth.mapper.ts
```

This allows API contracts to remain separate from application models.

------------------------------------------------------------------------

## 14. State Ownership

State ownership is intentional:

  -----------------------------------------------------------------------
  State                               Owner
  ----------------------------------- -----------------------------------
  Authenticated user/session          Zustand auth store

  Theme                               Zustand preferences store

  Sidebar preference                  Zustand preferences store

  Default page size                   Zustand preferences store

  Users                               TanStack Query

  Work items                          TanStack Query

  Search/filter/sort/page             URL search parameters

  Form values                         React Hook Form

  Form validation                     Zod

  Derived totals/visible rows         Derived local calculation /
                                      `useMemo` where justified
  -----------------------------------------------------------------------

User and work-item collections are not duplicated into Zustand or
localStorage as a second source of truth.

------------------------------------------------------------------------

## 15. TanStack Query Strategy

Query keys are centralized in:

``` text
src/api/queryKeys.ts
```

Query hooks are responsible for remote state:

``` text
features/users/hooks/
features/work-items/hooks/
features/dashboard/hooks/
```

The query client uses deliberate defaults for:

-   retry behavior,
-   stale time,
-   garbage collection,
-   reconnect behavior,
-   refetch behavior.

Successful simulated mutations should update or invalidate the
appropriate query cache so the current session reflects the mutation.

Logout clears the TanStack Query cache to prevent identity-sensitive
data from surviving between sessions.

------------------------------------------------------------------------

## 16. User List URL State

User-list navigation state is URL-owned:

``` text
q
role
sortBy
order
page
pageSize
```

Example:

``` text
/app/users?q=emily&role=admin&sortBy=age&order=desc&page=2&pageSize=20
```

Benefits:

-   bookmarkable state,
-   refresh-safe state,
-   shareable filtered views,
-   browser navigation support,
-   no duplicate server-state store.

Changing search, role, sort, or page size resets pagination to page 1.

If `pageSize` is not present in the URL, the default page size comes
from the Zustand preferences store.

------------------------------------------------------------------------

## 17. Form Validation

Forms use:

``` text
React Hook Form
        +
Zod
        +
zodResolver
```

Schemas are colocated with their feature:

``` text
features/auth/schemas/login.schema.ts
features/users/schemas/user-form.schema.ts
features/work-items/schemas/work-item.schema.ts
```

Form types are inferred from schemas using `z.infer`.

### Login

-   Username required
-   Password required

### User

-   First name required
-   Last name required
-   Valid email required
-   Phone required
-   Age must be an integer
-   Age must be at least 1
-   Age must be at most 120
-   Role must be a supported role
-   Department required

### Work Item

-   Title minimum 5 characters
-   Title maximum 200 characters
-   Assignee required
-   Assignee must be a positive integer
-   Completion state must be boolean

Numeric form fields must be converted to numbers before schema
validation using `valueAsNumber` or an explicit coercion/preprocess
strategy.

Server field errors should be mapped to fields where supported, while
non-field errors should be displayed as a form/root error.

Create and edit workflows reuse the same form components rather than
maintaining copy-pasted forms.

------------------------------------------------------------------------

## 18. Shared Components

The shared UI layer includes:

``` text
Button
ConfirmDialog
DataTable
EmptyState
ErrorState
Input
Loader
PageHeader
Pagination
Select
Skeleton
StatusBadge
```

These components provide consistent behavior, accessibility,
loading/disabled states, and visual patterns.

Feature-specific components remain inside their feature when they are
not genuinely reusable.

------------------------------------------------------------------------

## 19. Loading, Error, Empty and Success States

The application intentionally handles:

-   initial loading,
-   background fetching,
-   API errors,
-   retry,
-   empty datasets,
-   empty filtered results,
-   successful mutations,
-   mutation loading,
-   permission failures,
-   invalid/not-found resources,
-   403,
-   404. 

The UI should not assume that API calls always succeed.

------------------------------------------------------------------------

## 20. API Endpoints

Base URL:

``` text
https://dummyjson.com
```

### Authentication

``` text
POST /auth/login
GET  /auth/me
```

### Users

``` text
GET    /users
GET    /users/:id
GET    /users/search
GET    /users/filter
POST   /users/add
PUT    /users/:id
DELETE /users/:id
```

### Work Items

DummyJSON todos are used as work items:

``` text
GET    /todos
GET    /todos/:id
POST   /todos/add
PUT    /todos/:id
DELETE /todos/:id
GET    /todos/user/:userId
```

The exact request construction and response normalization remain inside
the API/service layers.

------------------------------------------------------------------------

## 21. Accessibility and Responsive Behavior

The application uses:

-   semantic headings,
-   accessible labels,
-   keyboard-friendly controls,
-   focus-visible states,
-   skip-to-content navigation,
-   accessible loading messaging,
-   semantic navigation,
-   responsive layouts,
-   mobile-friendly navigation behavior.

Color is not intended to be the only signal for active/status states.

------------------------------------------------------------------------

## 22. Error and Permission Handling

### Authentication

Unauthenticated users attempting protected routes are redirected to:

``` text
/login
```

The originally requested location is preserved where supported.

### Authorization

Authenticated users without the required permission are redirected to:

``` text
/forbidden
```

### Unknown routes

Unknown routes are redirected to:

``` text
/not-found
```

### Invalid dynamic IDs

Dynamic IDs are validated before being used to make API requests.
Invalid values such as `abc`, `0`, negative values, or `NaN` should not
be sent to the API.

------------------------------------------------------------------------

## 23. Known Limitations

This application uses DummyJSON, so:

1.  Create/update/delete operations are simulated.
2.  Mutations are not durable production database writes.
3.  Hard refresh can reset simulated API-side mutations.
4.  Authentication is demo authentication and is not production-grade
    security.
5.  Frontend authorization is UI/application authorization only; there
    is no real backend authorization enforcement.
6.  Automated testing is intentionally out of scope for this assessment.
7.  DummyJSON should not be treated as a production backend.
8.  Frontend environment variables are public and must not contain
    secrets.

Known implementation gaps must be resolved or documented before final
submission rather than silently hidden.

------------------------------------------------------------------------

## 24. Manual Verification

### Authentication

-   [ ] Administrator can log in.
-   [ ] Manager can log in.
-   [ ] Contributor can log in.
-   [ ] Invalid credentials show an error.
-   [ ] Protected routes redirect unauthenticated users to login.
-   [ ] Logout clears authentication state and query cache.

### Authorization

-   [ ] Administrator sees all permitted navigation/actions.
-   [ ] Manager cannot create/edit/delete users.
-   [ ] Contributor cannot access the user directory.
-   [ ] Contributor cannot edit another user's work item.
-   [ ] Unauthorized direct URLs resolve to 403.

### Users

-   [ ] User list loads.
-   [ ] Search works.
-   [ ] Role filter works.
-   [ ] Sorting works.
-   [ ] Pagination works.
-   [ ] Page size works.
-   [ ] User-list state is preserved in the URL.
-   [ ] Default page size follows Settings when `pageSize` is absent.
-   [ ] Explicit URL `pageSize` overrides the preference.
-   [ ] User details load.
-   [ ] Create user works.
-   [ ] Edit user works.
-   [ ] Delete confirmation and mutation feedback work.

### Work Items

-   [ ] Work-item list loads.
-   [ ] Search/filter works.
-   [ ] Assignee filtering respects permissions.
-   [ ] Pagination works.
-   [ ] Create work item works.
-   [ ] Edit work item works.
-   [ ] Ownership restrictions work.
-   [ ] Delete confirmation works.
-   [ ] Mutation feedback is visible.

### UX states

-   [ ] Loading state.
-   [ ] Background fetching indicator.
-   [ ] Error + retry.
-   [ ] Empty dataset.
-   [ ] Empty filtered result.
-   [ ] Success feedback.
-   [ ] 403.
-   [ ] 404.

### Quality gates

``` bash
npm ci
npm run type-check
npm run lint
npm run build
```

------------------------------------------------------------------------

## 25. Architecture Decisions

### Server state vs Zustand

Users and work items remain in TanStack Query because they are
remote/server-owned data.

Zustand is limited to:

-   authentication/session state,
-   theme,
-   sidebar preference,
-   default page size.

### URL state

Search, filtering, sorting, pagination, and page size belong to URL
search parameters because they are navigation state that should survive
refresh and be shareable.

### DTOs and mappers

API response DTOs are not exposed directly to UI components. Mappers
convert external responses into application models.

### Central API client

Axios configuration, base URL, timeout, interceptors, and error
normalization are centralized so pages and components do not make direct
HTTP calls.

### Feature boundaries

Users, work items, authentication, dashboard, profile, and settings have
separate feature boundaries to keep responsibilities discoverable.

### Shared UI

Only genuinely reusable primitives are placed under `shared/components`.
Feature-specific behavior stays within the feature.

------------------------------------------------------------------------

## 26. Assessment Alignment

This project addresses the assessment areas:

-   TypeScript strictness and domain typing
-   Reusable React component architecture
-   Custom hooks
-   React Router and protected routes
-   Role-based permissions
-   API client and DTO boundaries
-   Mappers
-   TanStack Query
-   React Hook Form + Zod
-   Zustand state ownership
-   Loading/error/empty/success UX
-   Accessibility and responsive behavior
-   Documentation and production-readiness practices

The assessment expects the candidate to be able to explain the
architecture, state ownership, route tree, API boundaries, DTO/model
mapping, cache strategy, forms, permissions, and UX states during the
final walkthrough.

------------------------------------------------------------------------

## 27. AI Assistance Disclosure

AI assistance was used during development for:

-   debugging TypeScript and ESLint errors,
-   reviewing architecture and folder responsibilities,
-   reviewing React Router and TanStack Query patterns,
-   reviewing Zod validation,
-   suggesting implementation refinements,
-   reviewing requirement coverage,
-   drafting and reviewing project documentation.

The implementation should be reviewed by the candidate against the SRS,
and the candidate should be able to explain, debug, and modify every
submitted implementation. The final walkthrough and live-change exercise
are part of the assessment ownership validation.

------------------------------------------------------------------------

## 28. Submission Checklist

-   [ ] README.md included
-   [ ] CHANGELOG.md included
-   [ ] `.env.example` included and current
-   [ ] Lockfile committed
-   [ ] No `node_modules`
-   [ ] No `dist`
-   [ ] No secrets or real credentials
-   [ ] Type-check passes
-   [ ] Lint passes
-   [ ] Production build passes
-   [ ] Mandatory routes verified
-   [ ] All three roles verified
-   [ ] 403 and 404 verified
-   [ ] Loading/error/empty/success states verified
-   [ ] Desktop and mobile behavior verified
-   [ ] Manual verification evidence captured
-   [ ] PR requirement coverage documented
-   [ ] Known limitations documented
-   [ ] AI assistance disclosure included

------------------------------------------------------------------------

## 29. Final Quality Gate

Before submission:

``` bash
npm ci
npm run type-check
npm run lint
npm run build
```

The final repository should be installable, understandable, reviewable,
buildable, and explainable by the candidate.
