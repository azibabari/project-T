# Copilot Instructions for AI Coding Agents
## Project Overview
This is a React Native (Expo) TypeScript project structured for modularity and scalability. The app is organized into feature-based folders under `app/`, with shared components in `components/`, context providers in `contexts/`, hooks in `hooks/`, and utility functions in `utils/`. Assets are stored in `assets/`.




## Architecture & Data Flow

- **Navigation:** Uses Expo Router conventions. Main navigation layouts are in `app/_layout.tsx` and nested layouts in `app/(app)/_layout.tsx` and `app/(tabs)/_layout.tsx`.

- **Pages:** Each screen is a file under `app/` or its subfolders. Route grouping (e.g., `(app)`, `(tabs)`) is used for logical separation.
- **State Management:** Context API is used for global state (see `contexts/AuthContext.tsx`).
- **Data Persistence:** Local storage utilities are in `utils/onboardingStorage.ts`.
- **Personalization Logic:** Customization flows are handled in `utils/culturalPersonalization.ts` and `components/CulturalQuestions.tsx`.

## Developer Workflows
- **Build/Run:** Use Expo CLI (`npx expo start`) for development. Hot reload is enabled by default.
- **Type Checking:** TypeScript is enforced. Types are defined in `types/`.
- **Testing:** No test files detected; add tests in `__tests__/` or alongside components if needed.
- **Debugging:** Use Expo Go or device simulators. Debug context logic via `contexts/` and navigation via layout files.

## Project-Specific Conventions
- **Route Grouping:** Use parentheses in folder names (e.g., `(app)`, `(tabs)`) for logical route separation.
- **Component Structure:** Prefer functional components. Shared UI elements go in `components/`.
- **Context Usage:** Place context providers in `contexts/` and wrap layouts as needed.
- **Asset Management:** Store images in `assets/images/` and reference them via relative paths.
- **Type Safety:** All new code should use TypeScript types from `types/`.

## Integration Points
- **External Libraries:** Uses Expo, React Native, and Babel. See `package.json` for dependencies.
- **Custom Hooks:** Place reusable logic in `hooks/` (e.g., `useFrameworkReady.ts`).
- **Cross-Component Communication:** Use context or props; avoid global variables.

## Key Files & Directories
- `app/` — Main app screens and navigation layouts
- `components/` — Shared UI components
- `contexts/` — Context providers for global state
- `hooks/` — Custom React hooks
- `utils/` — Utility functions for storage and personalization
- `assets/images/` — Static image assets
- `types/` — TypeScript type definitions
- `package.json` — Dependency management
- `tsconfig.json` — TypeScript configuration

## Example Patterns
- **Screen Definition:** `app/(tabs)/profile.tsx` defines a tab screen using functional components and context.
- **Context Usage:** `contexts/AuthContext.tsx` provides authentication state and methods.
- **Utility Usage:** `utils/onboardingStorage.ts` handles onboarding data persistence.

---

For unclear conventions or missing workflows, ask the user for clarification or examples.

## Strict Agent Instructions

Strictly follow my instructions and only perform the tasks I explicitly request. 

YOU DO NOT HAVE ANY BUSINESS WHATSOVER WITH ANY .GITIGNORE OR ENV FILES, DO NOT EVEN READ THEM.

Do not modify any existing files or code in my repository, including the workflow file at .github/workflows and the actions file at action/run-cypress-tests, unless I specifically instruct you to do so. If all tests in my repository are running successfully and I provide a new command, you must only add new code or files as needed to fulfill the request, without altering any previously written code or configurations. If a change to existing code is absolutely necessary to complete the task, you must first explain why the change is required in detail and ask for my explicit permission before proceeding. Do not take any actions beyond what I have requested.
