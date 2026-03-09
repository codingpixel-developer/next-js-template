# AGENT.md

This file provides guidance to Claude Code and other AI agents when working with this repository.

## Development Commands

```bash
# Development server (hot reload at localhost:3000)
npm run dev

# Production build (outputs to .next/, standalone output enabled)
npm run build

# Start production server (must run build first)
npm run start

# ESLint check (Next.js core-web-vitals + TypeScript rules)
npm run lint
```

## Architecture Overview

This is a **Next.js 16 App Router** production template with authentication, Redux state management, and a hybrid Tailwind v4 + SCSS styling system.

### Key Technologies
- **Next.js 16** with App Router, React 19, TypeScript 5
- **Tailwind CSS v4** with CSS variables and `@theme inline` for theming
- **SCSS/Sass** with mixins and variables in `styles/` directory
- **Redux Toolkit** with redux-persist for auth/user state
- **next-themes** for dark/light mode switching
- **Formik + Yup** for form handling and validation
- **Axios** with automatic token refresh and request queuing

### Project Structure

```
app/
├── (pages)/
│   ├── (auth)/           # Route group: auth pages (login, register)
│   │   ├── login/
│   │   └── layout.tsx
│   └── (dashboard)/     # Route group: protected pages (dashboard)
│       ├── dashboard/
│       └── layout.tsx
├── _shared/              # Shared code (components, lib, hooks)
│   ├── components/
│   │   ├── ui/           # Reusable UI components
│   │   │   ├── accordion/
│   │   │   ├── alert/
│   │   │   ├── badge/
│   │   │   ├── button/
│   │   │   ├── checkbox/
│   │   │   ├── dropdown/
│   │   │   ├── fileUpload/
│   │   │   ├── input/
│   │   │   ├── noContentCard/
│   │   │   ├── pagination/
│   │   │   ├── phoneInput/
│   │   │   ├── spinner/
│   │   │   ├── tabs/
│   │   │   ├── textArea/
│   │   │   ├── themeToggle/
│   │   │   ├── toast/
│   │   │   ├── toggleSwitch/
│   │   │   └── tooltip/
│   │   ├── forms/        # Form-specific components
│   │   └── providers/    # StoreProvider, ThemeProvider, ToastProvider
│   └── lib/
│       ├── api/          # Axios instance with token refresh + request queue
│       ├── config/       # Route configuration (PUBLIC_ROUTES, etc.)
│       ├── hooks/        # useAuth, useTheme, useRedux, useToast
│       ├── store/        # Redux slices (auth, user), store.ts with persist
│       ├── types/        # TypeScript types
│       ├── utils/        # storage.ts (cookie utilities), assets.ts
│       └── validations/  # Yup validation schemas
├── api/                  # API routes
├── layout.tsx            # Root layout with StoreProvider, ThemeProvider
├── globals.css           # Tailwind + CSS custom properties
├── error.tsx             # Global error boundary
├── loading.tsx           # Global loading UI
└── not-found.tsx         # 404 page

styles/
├── _variables.scss       # SCSS variables
├── _mixins.scss          # SCSS mixins
└── globals.scss          # SCSS entry point

proxy.ts                  # Auth protection + redirects (Next.js 16)
```

### Path Aliases

The `@/*` path alias maps to the project root.

**Important Import Paths:**
- `@/app/_shared/lib/*` - Shared utilities, hooks, store, API
- `@/app/_shared/components/*` - Shared components
- `@/app/_shared/lib/config/routes` - Route configuration
- `@/app/_shared/lib/hooks/useAuth` - Authentication hook
- `@/app/_shared/lib/store/store` - Redux store
- `@/app/_shared/lib/utils/storage` - Cookie utilities

### Authentication Architecture

**Proxy (`proxy.ts`)**: Checks `token` cookie, redirects unauthenticated users from protected routes, redirects authenticated users away from auth routes.

**Axios Interceptor (`app/_shared/lib/api/axios.ts`)**:
- Adds Bearer token from cookies to requests
- On 401: queues pending requests (max 100), refreshes token via `/auth/refresh`, retries queue
- On refresh failure: clears cookies and redirects to `/login`
- Uses storage utilities for consistent cookie handling

**Route Configuration (`app/_shared/lib/config/routes.ts`)**:
- `PUBLIC_ROUTES`, `PROTECTED_ROUTES`, `AUTH_ROUTES` arrays
- `isPublicRoute()`, `isProtectedRoute()`, `isAuthRoute()` with O(1) Set lookups
- Modify these to change access control

**Redux Persist (`app/_shared/lib/store/store.ts`)**: Auth slice persists `isLoggedIn`, `token`, `refreshToken`. User slice persists `user` data.

### Styling System

**CSS Variables** (`app/globals.css`): Custom properties for colors, spacing, shadows organized by semantic meaning (`--color-primary-500`, `--color-bg-primary`). Dark mode toggles via `.dark` class.

**Tailwind v4** uses `@import "tailwindcss"` and `@theme inline` for theme registration.

**SCSS** (`styles/`): Mixins include `flex-center`, `flex-between`, `text-truncate`, `custom-scrollbar`. Import with `@use '@/styles/globals'` in component styles.

### Form Validation

Validation schemas in `app/_shared/lib/validations/schemas.ts`: `loginSchema`, `registerSchema`, `forgotPasswordSchema`, `resetPasswordSchema`, `profileSchema`, `changePasswordSchema`, `contactSchema`.

Use with Formik: `validationSchema: loginSchema`.

### Key Hooks

- `useAuth()` - Authentication state and operations
- `useTheme()` - Theme toggle and current theme
- `useRedux()` - Typed Redux hooks (`useAppDispatch`, `useAppSelector`)
- `useToast()` - Toast notifications (requires ToastProvider)

## UI Components

All UI components are located in `app/_shared/components/ui/` and follow these patterns:
- **camelCase** folder and file names (e.g., `button/button.tsx`)
- **SCSS modules** with CSS custom properties for theming
- **TypeScript** interfaces for type safety
- **Dark mode support** via `.dark` class and CSS variables

### Available Components

#### Layout & Navigation
- **Accordion** - Collapsible content panels with single/multiple expand modes
- **Tabs** - Tabbed interface with animated content switching
- **Pagination** - Page navigation with configurable visible pages

#### Forms & Inputs
- **Button** - Multi-variant button with loading state
- **Input** - Text input with icons, error states, and helper text
- **TextArea** - Multi-line text input with character count
- **Checkbox** - Checkbox with indeterminate state support
- **ToggleSwitch** - On/off toggle switch
- **PhoneInput** - International phone number input (uses react-phone-number-input)
- **FileUpload** - Drag & drop file upload with preview

#### Feedback & Display
- **Alert** - Contextual feedback messages (info, success, warning, error)
- **Badge** - Status indicators and counters
- **Tooltip** - Hover information popups
- **Spinner** - Loading indicators
- **NoContentCard** - Empty state placeholder
- **Toast** - Notification system with ToastProvider

#### Overlays
- **Dropdown** - Context menus and dropdowns

### Component Usage Examples

```typescript
// Accordion
import { Accordion } from '@/app/_shared/components/ui/accordion/accordion';
<Accordion defaultExpanded={['item-1']} allowMultiple>
  <Accordion.Item id="item-1">
    <Accordion.Trigger>Section 1</Accordion.Trigger>
    <Accordion.Content>Content 1</Accordion.Content>
  </Accordion.Item>
</Accordion>

// Alert
import { Alert } from '@/app/_shared/components/ui/alert/alert';
<Alert variant="success" title="Success" onClose={() => {}}>
  Operation completed successfully
</Alert>

// Badge
import { Badge } from '@/app/_shared/components/ui/badge/badge';
<Badge variant="primary" pill>New</Badge>

// Checkbox
import { Checkbox } from '@/app/_shared/components/ui/checkbox/checkbox';
<Checkbox label="Accept terms" checked={checked} onChange={handleChange} />

// Dropdown
import { Dropdown } from '@/app/_shared/components/ui/dropdown/dropdown';
<Dropdown trigger={<Button>Menu</Button>}>
  <Dropdown.Item onClick={action}>Action</Dropdown.Item>
  <Dropdown.Divider />
  <Dropdown.Item destructive onClick={deleteAction}>Delete</Dropdown.Item>
</Dropdown>

// FileUpload
import { FileUpload } from '@/app/_shared/components/ui/fileUpload/fileUpload';
<FileUpload
  multiple
  maxFiles={5}
  maxSize={5 * 1024 * 1024}
  accept="image/*,.pdf"
  onFilesChange={(files) => console.log(files)}
/>

// Pagination
import { Pagination } from '@/app/_shared/components/ui/pagination/pagination';
<Pagination
  currentPage={1}
  totalPages={10}
  onPageChange={(page) => setPage(page)}
/>

// PhoneInput
import { PhoneInput } from '@/app/_shared/components/ui/phoneInput/phoneInput';
<PhoneInput
  value={phone}
  onChange={setPhone}
  defaultCountry="US"
  label="Phone Number"
/>

// Tabs
import { Tabs } from '@/app/_shared/components/ui/tabs/tabs';
<Tabs defaultTab="tab1">
  <Tabs.List>
    <Tabs.Tab id="tab1">Tab 1</Tabs.Tab>
    <Tabs.Tab id="tab2">Tab 2</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel id="tab1">Content 1</Tabs.Panel>
  <Tabs.Panel id="tab2">Content 2</Tabs.Panel>
</Tabs>

// TextArea
import { TextArea } from '@/app/_shared/components/ui/textArea/textArea';
<TextArea
  label="Description"
  rows={6}
  maxLength={500}
  showCount
  resize="vertical"
/>

// ToggleSwitch
import { ToggleSwitch } from '@/app/_shared/components/ui/toggleSwitch/toggleSwitch';
<ToggleSwitch
  label="Enable notifications"
  checked={enabled}
  onChange={(e) => setEnabled(e.target.checked)}
/>

// Tooltip
import { Tooltip } from '@/app/_shared/components/ui/tooltip/tooltip';
<Tooltip content="More information" position="top">
  <span>Hover me</span>
</Tooltip>

// NoContentCard
import { NoContentCard } from '@/app/_shared/components/ui/noContentCard/noContentCard';
<NoContentCard
  title="No items found"
  description="Try adjusting your filters"
  action={<Button>Create Item</Button>}
/>

// Spinner
import { Spinner } from '@/app/_shared/components/ui/spinner/spinner';
<Spinner size="md" variant="primary" />

// Toast (requires ToastProvider in layout)
import { ToastProvider, useToast } from '@/app/_shared/components/ui/toast/toast';
// In layout: <ToastProvider position="top-right"><App /></ToastProvider>
// In component:
const { addToast } = useToast();
addToast({ title: 'Success', description: 'Item saved', variant: 'success' });
```

### Next.js Configuration (`next.config.ts`)

- `output: "standalone"` for Docker/containerized deployments
- Root redirect: If `token` cookie exists, redirect `/` to `/dashboard`
- Security headers: X-Frame-Options, X-Content-Type-Options, Referrer-Policy
- Images: WebP/AVIF formats, remotePatterns allow all HTTPS hosts

### Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
NODE_ENV=development
```

**Used Variables:**
- `NEXT_PUBLIC_API_BASE_URL` - Base URL for API requests (used in `axios.ts`)
- `NODE_ENV` - Environment mode, affects cookie security settings (used in `storage.ts`)

## Asset Management

**CRITICAL RULE:** All static assets MUST be imported and exported through their respective `index.ts` files. Never reference asset paths directly in components.

Static assets (images, icons, fonts) are organized in the `public/` folder with centralized exports:

```
public/
├── icons/
│   ├── index.ts          # Central export for all icons
│   └── *.svg
├── images/
│   ├── index.ts          # Central export for all images
│   └── *
└── fonts/
    ├── index.ts          # Central export for all fonts
    └── *
```

### Adding New Assets (Required Workflow)

When adding any asset to `public/icons/`, `public/images/`, or `public/fonts/`:

1. **Place the asset file** in the appropriate folder
2. **Immediately add the export** in the corresponding `index.ts` file
3. **Import from the index file** in your components - never use hardcoded paths

**Example - Adding an image:**

```typescript
// Step 1: Add to public/images/hero-banner.jpg

// Step 2: Export in public/images/index.ts
export const images = {
  heroBanner: '/images/hero-banner.jpg',
  // ... other images
} as const;

// Step 3: Import and use in components
import { images } from '@/public/images';
import Image from 'next/image';

<Image src={images.heroBanner} alt="Hero" width={800} height={400} />
```

**Example - Adding an icon:**

```typescript
// Step 1: Add to public/icons/close.svg

// Step 2: Export in public/icons/index.ts
export const icons = {
  close: '/icons/close.svg',
  // ... other icons
} as const;

// Step 3: Import and use
import { icons } from '@/public/icons';

<img src={icons.close} alt="Close" />
```

### Why This Pattern?

- **Type Safety** - TypeScript knows all available asset paths
- **Refactoring** - Change asset locations in one place
- **Autocompletion** - IDE suggests available assets via `images.` or `icons.`
- **No Magic Strings** - Eliminates typos in path strings
- **Consistency** - All assets follow the same import/export pattern

### Anti-Patterns to Avoid

```typescript
// ❌ NEVER do this - hardcoded paths
<img src="/images/hero-banner.jpg" />

// ✅ ALWAYS do this - centralized import
import { images } from '@/public/images';
<img src={images.heroBanner} />
```

### Using Next.js Image Component

**ALWAYS use the Next.js `Image` component** for displaying images. Never use the native `<img>` tag.

```typescript
// ❌ NEVER use native img tag
<img src={images.heroBanner} alt="Hero" />

// ✅ ALWAYS use Next.js Image
import Image from 'next/image';
import { images } from '@/public/images';

<Image src={images.heroBanner} alt="Hero" width={800} height={400} priority />
```

**Why?** Next.js Image provides automatic optimization, lazy loading, responsive sizing, and better performance.

## Code Quality Standards

### Component Size Limit

**CRITICAL RULE:** Component files must NEVER exceed 300-350 lines of code.

If a component grows beyond this limit:
- **Extract sub-components** into separate files
- **Move logic to custom hooks** in `app/_shared/lib/hooks/`
- **Split large forms** into field components
- **Create utility functions** for repetitive logic

```typescript
// ❌ DON'T: A 500-line component file
// app/_shared/components/forms/LoginForm.tsx (500 lines)

// ✅ DO: Split into focused pieces
// app/_shared/components/forms/loginForm/LoginForm.tsx (80 lines)
// app/_shared/components/forms/loginForm/EmailField.tsx (40 lines)
// app/_shared/components/forms/loginForm/PasswordField.tsx (45 lines)
// app/_shared/lib/hooks/useLoginForm.ts (60 lines)
```

### Naming Conventions

**CRITICAL RULE:** All component folders and filenames MUST use **camelCase**.

```
app/_shared/components/
├── ui/
│   ├── button/
│   │   └── button.tsx           ✅ button - camelCase
│   ├── themeToggle/
│   │   └── themeToggle.tsx      ✅ themeToggle - camelCase
│   └── input/
│       └── input.tsx            ✅ input - camelCase
├── forms/
│   ├── loginForm/
│   │   ├── loginForm.tsx        ✅ loginForm - camelCase
│   │   ├── emailField.tsx       ✅ emailField - camelCase
│   │   └── passwordField.tsx    ✅ passwordField - camelCase
```

**Anti-Patterns to Avoid:**

```
app/_shared/components/
├── ui/
│   ├── Button/
│   │   └── Button.tsx           ❌ PascalCase folder and file
│   ├── theme-toggle/
│   │   └── theme-toggle.tsx     ❌ kebab-case
│   └── input/
│       └── Input.tsx            ❌ PascalCase file
```

**Why camelCase?**
- **Consistency** with React/Next.js ecosystem conventions
- **Easier imports** - matches JavaScript variable naming
- **Cross-platform compatibility** - works on all file systems (case-sensitive and insensitive)
- **Simpler navigation** - no switching between cases when typing paths

## Route Management

**CRITICAL RULE:** Routes must NEVER be hardcoded or called directly as string literals. Always use the route configuration from `@/app/_shared/lib/config/routes.ts`.

### Route Configuration

The route configuration file centralizes all application routes:

```typescript
// app/_shared/lib/config/routes.ts
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  PROFILE: '/dashboard/profile',
  // ... all routes defined here
} as const;

export const PUBLIC_ROUTES = [ROUTES.HOME, ROUTES.LOGIN] as const;
export const PROTECTED_ROUTES = [ROUTES.DASHBOARD, ROUTES.PROFILE] as const;
export const AUTH_ROUTES = [ROUTES.LOGIN] as const;
```

### Using Routes

```typescript
// ❌ NEVER hardcode route strings
router.push('/dashboard');
redirect('/login');
href="/profile"

// ✅ ALWAYS import from routes config
import { ROUTES } from '@/app/_shared/lib/config/routes';

router.push(ROUTES.DASHBOARD);
redirect(ROUTES.LOGIN);
href={ROUTES.PROFILE}
```

### Why This Pattern?

- **Refactoring Safety** - Change a route path in one place
- **Type Safety** - TypeScript catches typos and invalid routes
- **IDE Autocompletion** - `ROUTES.` shows all available routes
- **Consistency** - All navigation uses the same source of truth

## Recent Structural Changes

**Migrated from flat structure to `_shared` folder:**
- `lib/*` → `app/_shared/lib/*`
- `components/*` → `app/_shared/components/*`
- Route groups: `(auth)` → `(pages)/(auth)`, `(dashboard)` → `(pages)/(dashboard)`

Always use `@/app/_shared/` prefix when importing from shared folders.
