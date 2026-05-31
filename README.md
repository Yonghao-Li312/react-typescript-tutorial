# Taskify

A React and TypeScript task manager with editable tasks, active/completed columns, and drag-and-drop movement between lists.

This repository started as a React TypeScript learning project and has been cleaned up as a small frontend portfolio project.

## Features

- Add new tasks with typed React state.
- Edit existing tasks inline.
- Delete tasks.
- Mark tasks complete or move them back to active.
- Drag tasks between active and completed columns with `@hello-pangea/dnd`.
- Accessible icon buttons with labels and titles.
- Componentized UI with `InputField`, `TodoList`, and `SingleTodo`.

## Tech Stack

- React
- TypeScript
- Create React App
- `@hello-pangea/dnd`
- React Icons
- CSS by component folder

## Project Structure

```text
.
|-- public/
|-- src/
|   |-- components/
|   |   |-- InputField.tsx
|   |   |-- SingleTodo.tsx
|   |   |-- TodoList.tsx
|   |   `-- styles.css
|   |-- App.tsx
|   |-- App.css
|   |-- index.tsx
|   `-- model.ts
|-- package.json
`-- README.md
```

## Run Locally

Install dependencies:

```powershell
npm install
```

Start the development server:

```powershell
npm start
```

Open `http://localhost:3000`.

Build for production:

```powershell
npm run build
```

## What This Demonstrates

- Type-safe component props and React state with TypeScript.
- List state management across active and completed task collections.
- Drag-and-drop UI behavior with a maintained DnD library.
- Inline edit mode with focus management through `useRef` and `useEffect`.
- Basic accessibility improvements for icon-only controls.

## Resume Version

**Taskify - React TypeScript Task Manager**  
`React, TypeScript, Drag and Drop, Component State`

- Built a typed React task manager with active/completed task columns, inline editing, deletion, completion toggles, and drag-and-drop movement.
- Managed shared list state across reusable components using TypeScript interfaces, React hooks, and `@hello-pangea/dnd`.
