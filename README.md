# Future Tech Dashboard API

API for managing ticketing and attendees

## Features
**TypeScript**: The project is built using TypeScript for type safety and improved developer experience.

**Node.js**: It is a server-side application built with the Node.js runtime.

**Modular Structure**: The src directory organizes the source code for clarity and maintainability.

## Installation

To get this project up and running on your local machine, follow these steps:

1. **Clone the repository:**
    
    ```
    git clone [https://github.com/mikek1337/FutureTech-Admin-API.git]
    cd your-project
    ```
    
2. **Install dependencies:**
    
    ```
    npm install
    ```
    

## Usage

This section explains how to run the application.

1. **Build the project:**
    
    ```
    npm run build
    ```
    
2. **Start the application:**
    
    ```
    npm start
    ```
    

The application will now be running. You can access it at `http://localhost:3000` (or whatever your specific port is).

## Configuration

If your project requires any configuration (e.g., environment variables, API keys), list them here.

Example `.env` file:

```
PORT=3000
```

## Scripts

This project includes several useful `npm` scripts to streamline your workflow.

- `npm run build`: Compiles the TypeScript code from `src/` to `dist/`.
    
- `npm start`: Runs the compiled JavaScript application from the `dist/` directory.
    
- `npm run dev`: (If applicable) Starts the application in development mode with a file watcher (e.g., using `nodemon` or `ts-node`).