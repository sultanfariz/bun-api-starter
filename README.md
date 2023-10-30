# TypeScript Bun API Starter

A simple and customizable TypeScript API boilerplate for Bun projects.

## Table of Contents
- [Getting Started](#getting-started)
- [Installation](#installation)
- [File Structures](#file-structures)

## Getting Started

### Installation

1. Clone this repository:
  ```sh
  git clone https://github.com/yourusername/typescript-node-boilerplate.git
  cd typescript-node-boilerplate
  ```
2. Install dependencies:
  ```bash
  bun install
  ```
3. Configure the project as needed. You may need to set environment variables from **
4. To start the development server:
  ```bash
  bun run index.ts
  ```
  >or you also could run debugger if you use Visual Studio Code. 

5. Create new routes, controllers, and repositories in the src directory.

### File Structures
```
.
└── src/
    ├── controllers/
    │   └── ${...}Controller.ts -> configurable
    └── infrastructure/
        ├── commons/
        │   ├── exceptions/
        │   │   ├── index.ts
        │   │   ├── CustomError.ts
        │   │   └── ${...}Error.ts -> configurable
        │   └── middlewares
        ├── repository/
        │   ├── gsheet -> configurable
        │   │   └── user
        │   └── prisma -> configurable
        │       ├── user
        │       └── admin
        ├── transport/
        │   └── validator/
        │       ├── index.ts
        │       └── ${...}Schema.ts -> configurable
        ├── routes
        └── app.ts
```
>you can insert any file or folder on the 'configurable' mark in above diagram.