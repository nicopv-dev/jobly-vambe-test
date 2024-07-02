# Vanbe Kanban Board test

_by [Nicolas Pereira](nicolaspereira.cl)_

## Installation

First, install all dependencies:

```bash
yarn install
# or
bun install --yarn
# or
npm install
```

## Run

Finally, run project in development mode:

```bash
yarn run dev
# or
bun run dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about the main dependencies used in the project:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [ShadCN](https://ui.shadcn.com/) - UI library
- [TailwindCSS](https://tailwindcss.com/) - component styles
- [Zustand](https://zustand-demo.pmnd.rs/) - global state management
- [React Hook Form](https://www.react-hook-form.com/) - form management
- [Framer Motion](https://www.framer.com/motion/) - Animation library

## Decisions

- Design decisions are primarily based on the number of columns and screen space. If we have 3 columns (**To do**, **In progress**, **Done**), it is more usable to have the columns side by side, taking advantage of the central space. Also, when the screen size is adjusted to smaller devices, the position of the columns does not change, using horizontal scroll instead.

- Regarding colors, the main focus is on highlighting a state or column with a distinctive color.

- I also added a color change functionality to the web (dark - light) in relation to the user experience.
