# React Core Concepts - Day 6 & 7

## JSX (JavaScript XML)
JSX is a syntax extension for JavaScript that allows writing HTML-like code in React. It gets transpiled to React.createElement() calls. JSX makes component structure more readable and allows embedding JavaScript expressions using curly braces {}. It's not mandatory but widely used in React development.

## Virtual DOM
Virtual DOM is a lightweight copy of the actual DOM kept in memory. React compares the Virtual DOM with the real DOM (diffing) and updates only changed elements (reconciliation). This makes React fast and efficient by minimizing direct DOM manipulation, which is expensive in terms of performance.

## Functional Components
Functional components are JavaScript functions that return JSX. They are simpler than class components and use React Hooks for state and lifecycle features. Modern React development primarily uses functional components due to their simplicity, better performance, and easier testing.

## Props (Properties)
Props are read-only data passed from parent to child components. They enable component reusability by making components dynamic and configurable. Props flow unidirectionally (top-down) and cannot be modified by the receiving component, ensuring predictable data flow.

## State
State is mutable data managed within a component using useState hook. When state changes, React re-renders the component to reflect updates. State is local to the component and can be passed to children as props, enabling interactive and dynamic UIs.

## Component Hierarchy
Component hierarchy is the tree structure of parent-child relationships between components. Parent components pass data down via props, while children can communicate up via callback functions. Proper hierarchy design ensures maintainable, scalable, and reusable code architecture.

## Folder Structuring
Organized folder structure separates concerns: components/ for reusable UI, pages/ for route components, context/ for global state, and utils/ for helper functions. Good structure improves code maintainability, collaboration, and scalability as the project grows.

---

## Project Structure

```
day6/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       (Props + Context)
│   │   ├── Footer.jsx       (Reusable)
│   │   └── Sidebar.jsx      (State + Props)
│   ├── context/
│   │   └── AppContext.jsx   (Context API)
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx        (State + Context)
│   │   └── Signup.jsx       (State)
│   ├── App.jsx              (Main component)
│   └── index.css            (Tailwind)
├── tailwind.config.js
└── package.json
```

## Features Implemented

✅ **Tailwind CSS** - Custom colors (pink, purple, indigo)
✅ **Props** - Navbar (isLoggedIn), Sidebar (menuItems)
✅ **State** - Login/Signup forms, Sidebar toggle
✅ **Context API** - Global user, rechargeData, selectedPlan
✅ **Reusable Components** - Navbar, Footer, Sidebar
✅ **Responsive Design** - Mobile-first approach
