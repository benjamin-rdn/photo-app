# Photography Portfolio Application

A React-based photo gallery application for showcasing photography collections.

## Overview

This application provides a simple and elegant way to display photography collections organized in libraries. It automatically generates a catalog of photo libraries from the folder structure in the `/public/photos/` directory.

## Setup

Install the dependencies:

```bash
pnpm install
```

## Available Scripts

This project uses pnpm as the package manager and includes the following scripts:

| Script | Description |
|--------|-------------|
| `pnpm dev` | Starts the development server at [http://localhost:3000](http://localhost:3000) with hot reloading. It also automatically generates the libraries data before starting the server. |
| `pnpm build` | Builds the application for production. Generates libraries data and creates optimized assets in the `dist` folder. |
| `pnpm preview` | Serves the production build locally to preview before deployment. |
| `pnpm generate-libs` | Generates the `libraries.json` file by scanning the photo directories in `/public/photos/`. |

## Project Structure

```
├── public/                         # Static assets served directly
│   ├── libraries.json              # Auto-generated catalog of photo libraries
│   └── photos/                     # Photo libraries organized in folders
│       ├── Portraits/              # Example photo library
│       │   ├── photo1.jpg
│       │   ├── ...                 # More portrait photos
│       └── Street Photo/           # Another example photo library
│           ├── photo1.jpg
│           ├── ...                 # More street photos
├── scripts/
│   └── generateLibraries.js        # Scans photo directories and creates libraries.json
├── src/
│   ├── components/                 # React components
│   │   ├── FlowPhotoView.tsx       # Flow-style photo viewer
│   │   ├── LibraryGrid.tsx         # Displays grid of available photo libraries
│   │   ├── LibraryView.tsx         # Displays photos within a selected library
│   │   └── PhotoModal.tsx          # Modal for displaying full-size photos
│   ├── App.tsx                     # Main application component with routing
│   ├── index.tsx                   # Application entry point
│   ├── App.css                     # Global styles
│   ├── index.css                   # Additional global styles
│   └── env.d.ts                    # TypeScript environment definitions
├── rsbuild.config.ts               # Rsbuild configuration
├── tsconfig.json                   # TypeScript configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── biome.json                      # Biome configuration for linting/formatting
├── package.json                    # Project dependencies and scripts
├── pnpm-lock.yaml                  # pnpm lockfile
├── pnpm-workspace.yaml             # pnpm workspace configuration
├── postcss.config.js               # PostCSS configuration
└── README.md                       # Project documentation
```

## How It Works

1. **Photo Organization**: Place your photos in subdirectories within the `/public/photos/` directory. Each subdirectory will become a separate library in the application.

2. **Data Generation**: When you run `pnpm dev` or `pnpm build`, the application automatically scans the photo directories and generates a `libraries.json` file with metadata about your photos.

3. **Navigation**: The application provides a grid view of all libraries and a detailed view for each library's photos.

## Adding New Photos

1. Create a new folder in `/public/photos/` with a descriptive name for your photo library
2. Add your photo files to this folder
3. Run `pnpm generate-data` to update the libraries catalog (or just restart the dev server)
4. Your new library will appear in the application

## Learn More

To learn more about the tools used in this project:

- [Rsbuild documentation](https://rsbuild.rs) - The build tool used for this project
- [React Router](https://reactrouter.com/) - For application routing
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
